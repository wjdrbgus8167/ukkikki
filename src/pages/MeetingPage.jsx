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
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSharing, setScreenSharing] = useState(false);

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
      .connect(token)
      .then(() => {
        let pub;
        if (isHost) {
          // 호스트: 기본적으로 카메라 스트림으로 퍼블리셔 생성
          pub = OV.initPublisher(undefined, {
            videoSource: undefined, // 기본 웹캠 사용
            audioSource: undefined, // 기본 마이크 사용
            publishVideo: true,
            publishAudio: true,
            resolution: '640x480',
            frameRate: 30,
          });
        } else {
          // 일반 사용자는 오디오만
          pub = OV.initPublisher(undefined, {
            videoSource: false,
            audioSource: true,
            publishVideo: false,
            publishAudio: true,
          });
        }
        newSession.publish(pub);
        setPublisher(pub);
        setSession(newSession);
      })
      .catch((err) => {
        console.error('Error connecting to the session:', err);
      });

    return () => {
      if (newSession) {
        newSession.disconnect();
      }
    };
  }, [token, isHost]);

  // 화면 공유 토글 함수 (호스트 전용)
  const toggleScreenShare = async () => {
    if (!session) {
      console.error('Session is not initialized.');
      return;
    }
    if (screenSharing) {
      // 화면 공유 중단: 현재 공유 스트림 언퍼블리시, 기존 카메라 퍼블리셔 재게시
      if (screenPublisher) {
        session.unpublish(screenPublisher);
        if (isHost && publisher) {
          session.publish(publisher);
        }
        setScreenSharing(false);
        setScreenPublisher(null);
      }
    } else {
      // 화면 공유 시작: 호스트의 경우 기존 카메라 퍼블리셔 언퍼블리시 후 공유 스트림 시작
      if (isHost && publisher) {
        session.unpublish(publisher);
      }
      try {
        // 새 화면 공유 퍼블리셔 생성 (비디오 source를 'screen'으로 지정)
        const OV = new OpenVidu();
        const newScreenPublisher = await OV.initPublisherAsync(undefined, {
          videoSource: 'screen',
          publishAudio: false,
          publishVideo: true,
          resolution: '1280x720',
          frameRate: 30,
        });
        newScreenPublisher.once('accessAllowed', async () => {
          await session.publish(newScreenPublisher);
          setScreenPublisher(newScreenPublisher);
          setScreenSharing(true);
          console.log('Screen sharing started successfully.');
          // 화면 공유 종료 이벤트 리스너 (사용자가 시스템 UI로 공유 중단 시)
          newScreenPublisher.stream.getMediaStream().getVideoTracks()[0].addEventListener('ended', () => {
            console.log('Screen sharing ended by user.');
            toggleScreenShare();
          });
        });
        newScreenPublisher.once('accessDenied', () => {
          console.warn('Screen sharing access denied.');
        });
      } catch (error) {
        console.error('Error during screen sharing initialization:', error);
      }
    }
  };

  return (
    <div>
      <h2>Meeting Page (proposalId: {proposalId})</h2>
      <p>{isHost ? '호스트 모드' : '참가자 모드'}</p>
      {isHost && (
        <div>
          <button onClick={toggleScreenShare}>
            {screenSharing ? '화면 공유 중지' : '화면 공유 시작'}
          </button>
        </div>
      )}
      <div>
        <h3>My Stream (Camera)</h3>
        {publisher && (
          <video
            autoPlay
            style={{ width: '320px', border: '1px solid #ccc' }}
            ref={(ref) => {
              if (ref && publisher) {
                publisher.addVideoElement(ref);
              }
            }}
          />
        )}
      </div>
      {screenSharing && screenPublisher && (
        <div>
          <h3>Screen Sharing</h3>
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
      <div>
        <h3>Other Streams</h3>
        {subscribers.map((sub, i) => (
          <div key={i}>
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
