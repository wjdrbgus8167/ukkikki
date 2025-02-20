import React, { useEffect, useState, useRef } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MeetingPage() {
  const { proposalId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isHost = searchParams.get('isHost') === 'true';

  const [session, setSession] = useState(null);
  const [OV, setOV] = useState(null); // OpenVidu 인스턴스 따로 보관
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSharing, setScreenSharing] = useState(false);

  useEffect(() => {
    if (!token) {
      console.error('No token provided. Cannot connect to session.');
      return;
    }

    // (1) OpenVidu 인스턴스 생성
    const newOV = new OpenVidu();
    setOV(newOV);

    // (2) 세션 초기화
    const newSession = newOV.initSession();

    // 스트림 생성 시 subscribe
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // 스트림 파괴 시 unsubscribe
    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    // 세션 연결
    newSession
      .connect(token)
      .then(() => {
        // 호스트이면 비디오+오디오, 일반 유저이면 오디오만
        const pubOptions = isHost
          ? {
              videoSource: undefined, // 카메라
              audioSource: undefined, // 마이크
              publishVideo: true,
              publishAudio: true,
              resolution: '640x480',
              frameRate: 30,
            }
          : {
              videoSource: false, // 영상 꺼짐
              audioSource: true,  // 마이크만 사용
              publishVideo: false,
              publishAudio: true,
            };

        // initPublisher는 오래된 버전 호환성 위해 newOV에서 호출
        const localPublisher = newOV.initPublisher(undefined, pubOptions, (error) => {
          if (error) {
            console.error('Error initializing publisher:', error);
            return;
          }
          // 발행
          newSession.publish(localPublisher);
          setPublisher(localPublisher);
          setSession(newSession);
        });
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

    // 컴포넌트 언마운트 시 세션 해제
    return () => {
      if (newSession) {
        newSession.disconnect();
      }
    };
  }, [token, isHost]);

  // 화면 공유 토글 함수 (호스트 전용) - 콜백 방식 사용
  const toggleScreenShare = () => {
    if (!session || !OV) {
      console.error('Session or OV is not initialized.');
      return;
    }

    if (screenSharing) {
      // 이미 화면 공유 중이라면 -> 중단
      if (screenPublisher) {
        session.unpublish(screenPublisher); // 공유 스트림 언퍼블리시
        if (isHost && publisher) {
          // 호스트의 기존 카메라 퍼블리셔 다시 게시
          session.publish(publisher);
        }
        setScreenSharing(false);
        setScreenPublisher(null);
      }
    } else {
      // 화면 공유 시작
      if (isHost && publisher) {
        // 호스트의 기존 카메라 퍼블리셔 언퍼블리시
        session.unpublish(publisher);
      }

      // 화면 공유용 퍼블리셔를 *OpenVidu 인스턴스*에서 initPublisher
      const newScreenPub = OV.initPublisher(
        undefined,
        {
          videoSource: 'screen',
          publishAudio: false,
          publishVideo: true,
          resolution: '1280x720',
          frameRate: 30,
        },
        (error) => {
          if (error) {
            console.error('Error during screen sharing initialization:', error);
            return;
          }

          newScreenPub.once('accessAllowed', () => {
            session.publish(newScreenPub);
            setScreenPublisher(newScreenPub);
            setScreenSharing(true);
            console.log('Screen sharing started successfully.');

            // 사용자가 시스템 UI에서 공유를 중단했을 때 이벤트
            newScreenPub.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener('ended', () => {
                console.log('Screen sharing ended by user.');
                toggleScreenShare(); // 공유 중단 로직 호출
              });
          });

          newScreenPub.once('accessDenied', () => {
            console.warn('Screen sharing access denied by the user.');
          });
        }
      );
    }
  };

  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* 메인 컨텐츠 영역 */}
      <main className="flex-grow flex flex-col items-center justify-start p-4">
        <h2 className="text-2xl font-bold mb-2">
          Meeting Page (proposalId: {proposalId})
        </h2>
        <p className="mb-4">{isHost ? '호스트 모드' : '참가자 모드'}</p>

        {/* 호스트만 화면 공유 버튼 표시 */}
        {isHost && (
          <div className="mb-4">
            <button
              onClick={toggleScreenShare}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {screenSharing ? '화면 공유 중지' : '화면 공유 시작'}
            </button>
          </div>
        )}

        {/* 호스트인 경우만 My Stream(카메라) 표시 */}
        {isHost && publisher && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">My Stream (Camera)</h3>
            <video
              autoPlay
              className="border border-gray-300 w-80"
              ref={(ref) => {
                if (ref && publisher) {
                  publisher.addVideoElement(ref);
                }
              }}
            />
          </div>
        )}

        {/* 화면 공유 영역 */}
        {screenSharing && screenPublisher && (
          <div className="w-full flex flex-col items-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Screen Sharing</h3>
            <video
              autoPlay
              className="border border-gray-300 w-3/4 max-w-4xl"
              ref={(ref) => {
                if (ref && screenPublisher) {
                  screenPublisher.addVideoElement(ref);
                }
              }}
            />
          </div>
        )}

        {/* Other Streams 영역 */}
        <div className="w-full flex flex-wrap justify-center gap-4">
          {subscribers.map((sub, i) => (
            <div key={i} className="flex flex-col items-center">
              <video
                autoPlay
                className="border border-gray-300 w-80"
                ref={(ref) => {
                  if (ref) sub.addVideoElement(ref);
                }}
              />
              <p className="mt-2 text-sm text-gray-700">
                {sub.stream.connection.data}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MeetingPage;
