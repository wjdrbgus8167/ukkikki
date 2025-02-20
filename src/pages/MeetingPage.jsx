// MeetingPage.jsx
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
  // 일반 사용자(참가자)의 퍼블리셔 (오디오만) – 필요 시 사용
  const [audioOnlyPublisher, setAudioOnlyPublisher] = useState(null);
  // 화면 공유 중 여부
  const [screenSharing, setScreenSharing] = useState(false);
  // 구독자 목록
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    if (!token) {
      console.error('No token provided. Cannot connect to session.');
      return;
    }

    const OV = new OpenVidu();
    const newSession = OV.initSession();

    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    newSession
      .connect(token, { clientData: isHost ? '호스트' : '참가자' })
      .then(() => {
        if (isHost) {
          // 호스트: 동기 방식으로 카메라 퍼블리셔 생성
          const camPub = OV.initPublisher(undefined, {
            videoSource: undefined, // 기본 웹캠 사용
            audioSource: undefined, // 기본 마이크 사용
            publishVideo: true,
            publishAudio: true,
            resolution: '640x480',
            frameRate: 30,
          });
          newSession.publish(camPub);
          setCameraPublisher(camPub);
        } else {
          // 일반 참가자: 동기 방식으로 오디오만 퍼블리셔 생성
          const audioPub = OV.initPublisher(undefined, {
            videoSource: false,
            audioSource: true,
            publishVideo: false,
            publishAudio: true,
          });
          newSession.publish(audioPub);
          setAudioOnlyPublisher(audioPub);
        }
        setSession(newSession);
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

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
  const toggleScreenShare = () => {
    if (!session) {
      console.error('Session is not ready.');
      return;
    }
    if (screenSharing) {
      // 화면 공유 중지: 공유 퍼블리셔 언퍼블리시
      if (screenPublisher) {
        session.unpublish(screenPublisher);
        setScreenPublisher(null);
      }
      setScreenSharing(false);
    } else {
      // 화면 공유 시작: 동기 방식으로 화면 공유 퍼블리셔 생성
      try {
        // 동기 방식으로 화면 공유 퍼블리셔 생성
        const screenPub = OV.initPublisher(undefined, {
          videoSource: 'screen',
          publishAudio: false, // 화면 공유 시 오디오 공유하지 않음 (필요 시 true로 변경)
          publishVideo: true,
          resolution: '1280x720',
          frameRate: 30,
        });
        session.publish(screenPub);
        setScreenPublisher(screenPub);
        setScreenSharing(true);
      } catch (error) {
        console.error('Error during screen share:', error);
      }
    }
  };

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

      {/* 호스트: 카메라 스트림 표시 */}
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

      {/* 호스트: 화면 공유 스트림 표시 */}
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

      {/* Other Streams: 모든 구독자 스트림 표시 */}
      <div>
        <h3>Other Streams</h3>
        {subscribers.map((sub, i) => (
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
        ))}
      </div>
    </div>
  );
}

export default MeetingPage;
