import React, { useEffect, useState } from 'react';
import {
  useParams,
  useSearchParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Swal from 'sweetalert2';
import { OpenVidu } from 'openvidu-browser';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function MeetingPage() {
  const navigate = useNavigate();
  const { proposalId } = useParams();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isHost = searchParams.get('isHost') === 'true';
  const location = useLocation();
  const { travelPlanId } = location.state || {};
  const [session, setSession] = useState(null);
  const [OV, setOV] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSharing, setScreenSharing] = useState(false);
  const [hostNickname, setHostNickname] = useState('');
  const [shouldDisconnect, setShouldDisconnect] = useState(false);

  useEffect(() => {
    if (!token) {
      console.error('No token provided. Cannot connect to session.');
      return;
    }
    console.log('Token provided:', token);

    // (1) OpenVidu 인스턴스 생성
    const newOV = new OpenVidu();
    setOV(newOV);
    console.log('OpenVidu instance created.');

    // (2) 세션 초기화
    const newSession = newOV.initSession();
    console.log('Session initialized.');

    // --- 이벤트 리스너 설정 ---
    newSession.on('streamCreated', (event) => {
      console.log('streamCreated event triggered:', event);
      const subscriber = newSession.subscribe(event.stream, undefined);
      console.log('Subscriber created for stream:', subscriber);
      setSubscribers((prev) => [...prev, subscriber]);

      // 일반 사용자: 호스트 스트림에서 닉네임 저장
      if (!isHost && !hostNickname) {
        const maybeHostName = subscriber.stream.connection.data;
        console.log('Setting host nickname from subscriber data:', maybeHostName);
        setHostNickname(maybeHostName);
      }
    });

    newSession.on('streamDestroyed', (event) => {
      console.log('streamDestroyed event triggered:', event);
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager),
      );
    });

    // 세션 연결
    newSession
      .connect(token)
      .then(() => {
        console.log('Session connected successfully.');
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
        console.log('Publisher options:', pubOptions);

        const localPublisher = newOV.initPublisher(
          undefined,
          pubOptions,
          (error) => {
            if (error) {
              console.error('Error initializing publisher:', error);
              return;
            }
            console.log('Publisher initialized successfully.');
            newSession.publish(localPublisher);
            console.log('Publisher published to session.');
            setPublisher(localPublisher);
            setSession(newSession);

            // 호스트라면 퍼블리셔 스트림에서 닉네임 가져오기
            if (isHost) {
              const myName = localPublisher.stream.connection.data;
              console.log('Setting host nickname from publisher:', myName);
              setHostNickname(myName);
            }
          },
        );
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

    // 호스트일 때 beforeunload 이벤트 추가
    if (isHost) {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = '';
      };
      window.addEventListener('beforeunload', handleBeforeUnload);
      console.log('beforeunload event listener added for host.');

      return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
        console.log('beforeunload event listener removed.');
        // unmount 시 disconnect 여부 결정
        if (newSession && shouldDisconnect) {
          newSession.disconnect();
          console.log('Session disconnected on unmount.');
        }
      };
    } else {
      // 일반 사용자 로직
      return () => {
        if (newSession) {
          newSession.disconnect();
          console.log('Session disconnected on unmount (non-host).');
        }
      };
    }
  }, [token, isHost, hostNickname, shouldDisconnect]);

  // "방송 종료"를 Swal로 묻고 세션 종료
  const leaveSession = async () => {
    if (!session) {
      console.error('No session to leave.');
      return;
    }
    console.log('Prompting user to confirm leaving the session.');
    const result = await Swal.fire({
      title: '방송을 종료하시겠습니까?',
      text: '확인하면 방송이 즉시 종료됩니다.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네, 종료합니다',
      cancelButtonText: '취소',
    });
    if (result.isConfirmed) {
      console.log('User confirmed to leave the session.');
      setShouldDisconnect(true);
      if (isHost) {
        console.log('Navigating to proposal detail page for host.');
        navigate(`/proposal-detail/${travelPlanId}/${proposalId}`);
      } else {
        console.log('Navigating to user vote page.');
        navigate(`/user-vote/${travelPlanId}`);
      }
    } else {
      console.log('User cancelled leaving the session.');
    }
  };

  // 화면 공유 토글 함수
  const toggleScreenShare = () => {
    if (!session || !OV) {
      console.error('Session or OV is not initialized.');
      return;
    }
    console.log('Toggling screen sharing. Current status:', screenSharing);

    if (screenSharing) {
      if (screenPublisher) {
        session.unpublish(screenPublisher);
        console.log('Screen sharing publisher unpublished.');
        if (isHost && publisher) {
          session.publish(publisher);
          console.log('Host publisher republished.');
        }
        setScreenSharing(false);
        setScreenPublisher(null);
        console.log('Screen sharing disabled.');
      }
    } else {
      if (isHost && publisher) {
        session.unpublish(publisher);
        console.log('Host publisher unpublished for screen sharing.');
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
          console.log('Screen sharing publisher initialized.');
          newScreenPub.once('accessAllowed', () => {
            session.publish(newScreenPub);
            console.log('Screen sharing publisher published.');
            setScreenPublisher(newScreenPub);
            setScreenSharing(true);
            console.log('Screen sharing started successfully.');
            newScreenPub.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener('ended', () => {
                console.log('Screen sharing ended by user (ended event).');
                toggleScreenShare();
              });
          });
          newScreenPub.once('accessDenied', () => {
            console.warn('Screen sharing access denied by the user.');
          });
        },
      );
    }
  };

  // 현재 참가자 수 (호스트 1 + subscribers)
  const participantCount = subscribers.length + 1;
  console.log('Current participant count:', participantCount);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 배경 동영상 */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        src="https://cdn.pixabay.com/video/2024/03/13/204006-923133925_large.mp4"
        autoPlay
        loop
        muted
      />

      <Header />

      {/* 메인 컨텐츠 */}
      <main className="flex flex-col items-center justify-start flex-grow p-4">
        {/* 제목을 hostNickname으로 표시 (없으면 proposalId 대체) */}
        <h2 className="mb-2 text-2xl font-bold">
          {hostNickname
            ? `Meeting with [${hostNickname}]`
            : `Meeting Page (proposalId: ${proposalId})`}
        </h2>

        {/* 호스트만 참가자 수 보기 */}
        {isHost && (
          <p className="mb-2 text-gray-600 text-md">
            참여 인원 수: {participantCount}명
          </p>
        )}

        <p className="mb-4">
          {isHost ? '호스트 모드' : '참가자 모드'}
        </p>

        {/* 호스트만 화면 공유 버튼 및 방송 종료 버튼 표시 */}
        {isHost && (
          <div className="flex gap-3 mb-4">
            <button
              onClick={toggleScreenShare}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              {screenSharing ? '화면 공유 중지' : '화면 공유 시작'}
            </button>
            <button
              onClick={leaveSession}
              className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            >
              방송 종료
            </button>
          </div>
        )}

        {/* 호스트 카메라: 화면 공유 중이 아닐 때 표시 */}
        {isHost && publisher && !screenSharing && (
          <div className="mb-4">
            <video
              autoPlay
              className="overflow-hidden border border-gray-300 w-80 rounded-xl"
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
          <div className="flex flex-col items-center w-full mb-4">
            <h3 className="mb-2 text-lg font-semibold">Screen Sharing</h3>
            <video
              autoPlay
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
        <div className="flex flex-wrap justify-center w-full gap-4">
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
