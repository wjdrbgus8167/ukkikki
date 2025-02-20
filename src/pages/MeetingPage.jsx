import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';

function MeetingPage() {
  const { proposalId } = useParams();
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

    // (1) OpenVidu 인스턴스 생성
    const OV = new OpenVidu();

    // (2) 세션 초기화
    const newSession = OV.initSession();

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
        let pub;
        if (isHost) {
          // 호스트: 카메라 + 마이크
          pub = OV.initPublisher(undefined, {
            videoSource: undefined,
            audioSource: undefined,
            publishVideo: true,
            publishAudio: true,
            resolution: '640x480',
            frameRate: 30,
          });
        } else {
          // 일반 사용자: 오디오만
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

    // 컴포넌트 언마운트 시 세션 해제
    return () => {
      if (newSession) {
        newSession.disconnect();
      }
    };
  }, [token, isHost]);

  // 화면 공유 토글 함수 (호스트 전용) - 콜백 방식 사용
  const toggleScreenShare = () => {
    if (!session) {
      console.error('Session is not initialized.');
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

      // 화면 공유용 퍼블리셔를 콜백 방식으로 생성
      const newScreenPublisher = session.initPublisher(
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

          /**
           * 여기서 accessAllowed, accessDenied 이벤트를 수신할 수 있습니다.
           * 특정 브라우저 버전에서는 콜백 시점에 이미 'accessAllowed'가 처리됐을 수도 있음에 유의.
           */
          newScreenPublisher.once('accessAllowed', () => {
            // 공유 스트림 발행
            session.publish(newScreenPublisher);
            setScreenPublisher(newScreenPublisher);
            setScreenSharing(true);
            console.log('Screen sharing started successfully.');

            // 사용자가 시스템 UI에서 공유를 중단했을 때 이벤트
            newScreenPublisher.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener('ended', () => {
                console.log('Screen sharing ended by user.');
                toggleScreenShare(); // 공유 중단 로직 호출
              });
          });

          newScreenPublisher.once('accessDenied', () => {
            console.warn('Screen sharing access denied by the user.');
          });
        }
      );
    }
  };

  return (
    <div>
      <h2>Meeting Page (proposalId: {proposalId})</h2>
      <p>{isHost ? '호스트 모드' : '참가자 모드'}</p>
      
      {/* 호스트만 화면 공유 버튼이 보이도록 */}
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
            {/* sub.stream.connection.data가 서버에서 건너온 memberName */}
            <p>{sub.stream.connection.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingPage;
