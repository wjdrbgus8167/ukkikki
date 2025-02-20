import React, { useEffect, useState } from 'react';
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
  const [OV, setOV] = useState(null); // OpenVidu 인스턴스
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSharing, setScreenSharing] = useState(false);

  // (1) 호스트 닉네임 저장
  const [hostNickname, setHostNickname] = useState(''); 

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

    // --- 이벤트 리스너 설정 ---

    // 스트림 생성 시 subscribe
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);

      // (1-1) 일반 사용자: 호스트 스트림이 들어오면 닉네임 저장
      if (!isHost && !hostNickname) {
        // 이 subscriber가 호스트일 가능성이 있음
        // 단순히 "처음으로 들어온 영상 스트림"을 호스트로 간주
        // (실제론 role==PUBLISHER 검사 or data 파싱 등 필요)
        const maybeHostName = subscriber.stream.connection.data;
        setHostNickname(maybeHostName);
      }
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
              videoSource: false,
              audioSource: true,
              publishVideo: false,
              publishAudio: true,
            };

        const localPublisher = newOV.initPublisher(
          undefined,
          pubOptions,
          (error) => {
            if (error) {
              console.error('Error initializing publisher:', error);
              return;
            }
            newSession.publish(localPublisher);
            setPublisher(localPublisher);
            setSession(newSession);

            // (1-2) 호스트라면, 퍼블리셔 스트림에서 닉네임 가져오기
            if (isHost) {
              const myName = localPublisher.stream.connection.data;
              setHostNickname(myName);
            }
          }
        );
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

    // 언마운트 시 세션 해제
    return () => {
      if (newSession) {
        newSession.disconnect();
      }
    };
  }, [token, isHost, hostNickname]);

  // 화면 공유 토글 함수 (호스트 전용)
  const toggleScreenShare = () => {
    if (!session || !OV) {
      console.error('Session or OV is not initialized.');
      return;
    }

    if (screenSharing) {
      // 이미 화면 공유 중이라면 -> 중단
      if (screenPublisher) {
        session.unpublish(screenPublisher);
        // 화면 공유 중단 시 카메라 퍼블리셔 다시 게시
        if (isHost && publisher) {
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

            // 시스템 UI에서 공유 중단 시
            newScreenPub.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener('ended', () => {
                console.log('Screen sharing ended by user.');
                toggleScreenShare();
              });
          });

          newScreenPub.once('accessDenied', () => {
            console.warn('Screen sharing access denied by the user.');
          });
        }
      );
    }
  };

  // (3) 현재 참가자 수 (간단 계산: 호스트(1) + subscribers.length)
  const participantCount = subscribers.length + 1;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex-grow flex flex-col items-center justify-start p-4">
        {/* (4) 제목을 hostNickname으로 표시 (없으면 proposalId 대체) */}
        <h2 className="text-2xl font-bold mb-2">
          {hostNickname
            ? `Meeting with [${hostNickname}]`
            : `Meeting Page (proposalId: ${proposalId})`}
        </h2>

        {/* (3) 호스트만 참가자 수 보기 */}
        {isHost && (
          <p className="text-md text-gray-600 mb-2">
            참여 인원 수: {participantCount}명
          </p>
        )}

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

        {/* (1) 호스트 카메라: 화면 공유 중이 아닐 때만 표시 */}
        {isHost && publisher && !screenSharing && (
          <div className="mb-4">
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

        {/* (2) 화면 공유 영역 (더 크게) */}
        {screenSharing && screenPublisher && (
          <div className="w-full flex flex-col items-center mb-4">
            <h3 className="text-lg font-semibold mb-2">Screen Sharing</h3>
            <video
              autoPlay
              // 약 2.5배 커진 예시
              className="border border-gray-300 w-[90%] max-w-screen-xl"
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
