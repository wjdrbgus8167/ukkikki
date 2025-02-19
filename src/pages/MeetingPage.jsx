import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';

function MeetingPage() {
  const { proposalId } = useParams();
  // 이전 페이지에서 navigate로 전달된 token, isHost, agency 등을 받음
  const location = useLocation();
  // 구조 분해 할당 (필요에 따라 agency 등 다른 정보도 사용 가능)
  const { token, isHost } = location.state || {};

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    // 1) OpenVidu 객체 생성 & 세션 초기화
    const OV = new OpenVidu();
    const newSession = OV.initSession();

    // 2) 이벤트 등록
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    // token이 없으면 연결 불가 → 에러 처리 혹은 뒤로 가기
    if (!token) {
      console.error('No token provided. Cannot connect to session.');
      return;
    }

    // 3) 세션 연결
    newSession
      .connect(token)
      .then(() => {
        // 4) 호스트인 경우 카메라 ON, 참가자는 오디오만
        if (isHost) {
          const pub = OV.initPublisher(undefined, {
            videoSource: 'camera',
            audioSource: true,
            publishVideo: true,
            publishAudio: true,
          });
          newSession.publish(pub);
          setPublisher(pub);
        } else {
          const pub = OV.initPublisher(undefined, {
            videoSource: false,
            audioSource: true,
            publishVideo: false,
            publishAudio: true,
          });
          newSession.publish(pub);
          setPublisher(pub);
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
    };
  }, [token, isHost]);

  return (
    <div>
      <h2>Meeting Page (proposalId: {proposalId})</h2>
      <p>{isHost ? '호스트 모드' : '참가자 모드'}</p>

      <div>
        <h3>My Stream</h3>
        {publisher && (
          <video
            autoPlay={true}
            ref={(ref) => {
              if (ref) publisher.addVideoElement(ref);
            }}
          />
        )}
      </div>

      <div>
        <h3>Other Streams</h3>
        {subscribers.map((sub, i) => (
          <div key={i}>
            <video
              autoPlay={true}
              ref={(ref) => {
                if (ref) sub.addVideoElement(ref);
              }}
            />
            {/* connection.data 안에 백엔드에서 세팅한 닉네임 등이 들어있을 수 있음 */}
            <p>{sub.stream.connection.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingPage;
