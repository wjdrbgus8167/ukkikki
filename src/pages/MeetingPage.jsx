import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';

function MeetingPage() {
  const { proposalId } = useParams();
  // 쿼리 파라미터로부터 token, isHost 추출
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const isHost = searchParams.get('isHost') === 'true';

  const [session, setSession] = useState(null);

  // 호스트 전용 퍼블리셔(카메라)
  const [cameraPublisher, setCameraPublisher] = useState(null);
  // 호스트 화면 공유 퍼블리셔
  const [screenPublisher, setScreenPublisher] = useState(null);

  // 일반 사용자(참가자)의 퍼블리셔 (오디오만) - 호스트가 아니면 여기에 저장
  const [audioOnlyPublisher, setAudioOnlyPublisher] = useState(null);

  // 화면 공유 중인지 여부
  const [screenSharing, setScreenSharing] = useState(false);

  // 구독자 목록 (호스트 + 일반 사용자 모두 다른 참가자의 스트림을 여기에 구독)
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (!token) {
      console.error('No token provided. Cannot connect to session.');
      return;
    }

    // 1) OpenVidu 세션 생성
    const OV = new OpenVidu();
    const newSession = OV.initSession();

    // 2) 다른 참가자의 스트림이 생성되면 subscribe
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // 3) 다른 참가자의 스트림이 파괴되면 구독 해제
    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager),
      );
    });

    // 4) 세션 연결
    newSession
      .connect(token)
      .then(async () => {
        if (isHost) {
          // 호스트: 카메라 퍼블리셔 생성
          const cameraPub = await OV.initPublisherAsync(undefined, {
            videoSource: undefined, // 기본 웹캠
            audioSource: undefined, // 기본 마이크
            publishVideo: true,
            publishAudio: true,
            resolution: '640x480',
            frameRate: 30,
          });
          await newSession.publish(cameraPub);
          setCameraPublisher(cameraPub);
        } else {
          // 일반 참가자: 오디오만 퍼블리셔
          const audioPub = await OV.initPublisherAsync(undefined, {
            videoSource: false,
            audioSource: true,
            publishVideo: false,
            publishAudio: true,
          });
          await newSession.publish(audioPub);
          setAudioOnlyPublisher(audioPub);
        }
        setSession(newSession);
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

    // 5) 컴포넌트 언마운트 시 세션 정리
    return () => {
      if (newSession) {
        newSession.disconnect();
      }
      setSession(null);
      setCameraPublisher(null);
      setScreenPublisher(null);
      setAudioOnlyPublisher(null);
      setSubscribers([]);
    };
  }, [token, isHost]);

  // 화면 공유 토글 함수 (호스트 전용)
  const toggleScreenShare = async () => {
    if (!session) {
      console.error('Session is not ready.');
      return;
    }
    if (screenSharing) {
      // 화면 공유 중지
      if (screenPublisher) {
        session.unpublish(screenPublisher);
        setScreenPublisher(null);
      }
      setScreenSharing(false);
    } else {
      // 화면 공유 시작
      try {
        const OV = new OpenVidu();
        const screenPub = await OV.initPublisherAsync(undefined, {
          videoSource: 'screen',
          publishAudio: false, // 화면 공유 시 오디오 공유가 필요하면 true
          publishVideo: true,
          resolution: '1280x720',
          frameRate: 30,
        });
        screenPub.once('accessAllowed', async () => {
          await session.publish(screenPub);
          setScreenPublisher(screenPub);
          setScreenSharing(true);
          // 사용자가 시스템 UI로 화면 공유 중단 시
          screenPub.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .addEventListener('ended', () => {
              console.log('Screen share ended by user');
              toggleScreenShare();
            });
        });
        screenPub.once('accessDenied', () => {
          console.warn('Screen share access denied');
        });
      } catch (error) {
        console.error('Error during screen share:', error);
      }
    }
  };

  // =====================
  // ===== RENDER UI =====
  // =====================

  return (
    <div>
      <h2>Meeting Page (proposalId: {proposalId})</h2>
      <p>{isHost ? '호스트 모드' : '참가자 모드'}</p>

      {/* 호스트 전용 화면 공유 버튼 */}
      {isHost && (
        <div>
          <button onClick={toggleScreenShare}>
            {screenSharing ? '화면 공유 중지' : '화면 공유 시작'}
          </button>
        </div>
      )}

      {/* 호스트일 경우, 카메라 스트림을 표시 */}
      {isHost && cameraPublisher && (
        <div>
          <h3>My Camera Stream</h3>
          <video
            autoPlay
            style={{ width: '320px', border: '1px solid #ccc' }}
            ref={(ref) => {
              if (ref && cameraPublisher) {
                cameraPublisher.addVideoElement(ref);
              }
            }}
          />
        </div>
      )}

      {/* 호스트 화면 공유 스트림 */}
      {isHost && screenSharing && screenPublisher && (
        <div>
          <h3>My Screen Sharing</h3>
          <video
            autoPlay
            style={{ width: '640px', border: '1px solid #ccc' }}
            ref={(ref) => {
              if (ref && screenPublisher) {
                screenPublisher.addVideoElement(ref);
              }
            }}
          />
        </div>
      )}

      {/* 일반 사용자(참가자)는 오디오만 -> 자신의 비디오는 표시 안 함 */}
      {/* audioOnlyPublisher를 굳이 보여줄 필요 없으므로 제외 */}

      <div>
        <h3>Other Streams</h3>
        {subscribers.map((sub, i) => {
          return (
            <div key={i} style={{ marginBottom: '20px' }}>
              <video
                autoPlay
                style={{ width: '320px', border: '1px solid #ccc' }}
                ref={(ref) => {
                  if (ref) sub.addVideoElement(ref);
                }}
              />
              <p>{sub.stream.connection.data}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MeetingPage;
