// MeetingPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';

function MeetingPage() {
  const { proposalId } = useParams();
  const [searchParams] = useSearchParams();
  const isHost = searchParams.get('isHost') === 'true';

  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);

  // JWT에서 nickname 추출 or 임시로 지정
  const nickname = isHost ? '호스트_홍길동' : '여행자_김철수';

  useEffect(() => {
    // 1) 세션 생성 & 이벤트 등록
    const OV = new OpenVidu();
    const newSession = OV.initSession();

    // 2) streamCreated -> 구독
    newSession.on('streamCreated', (event) => {
      const subscriber = newSession.subscribe(event.stream, undefined);
      setSubscribers((prev) => [...prev, subscriber]);
    });

    // 3) streamDestroyed -> 해제
    newSession.on('streamDestroyed', (event) => {
      setSubscribers((prev) =>
        prev.filter((sub) => sub !== event.stream.streamManager)
      );
    });

    // 4) 토큰 요청
    axios.post(`/api/v1/meetings/${proposalId}/token`, {
      isHost: isHost,
      nickname: nickname
    })
    .then(async (res) => {
      const token = res.data.token;
      // 5) 세션 연결
      await newSession.connect(token, { clientData: nickname });

      // 6) 호스트면 카메라 ON, 참가자면 오디오만
      if (isHost) {
        const pub = OV.initPublisher(undefined, {
          videoSource: 'camera',
          audioSource: true,
          publishVideo: true,
          publishAudio: true
        });
        newSession.publish(pub);
        setPublisher(pub);
      } else {
        // 참가자 -> 오디오만
        const pub = OV.initPublisher(undefined, {
          videoSource: false,
          audioSource: true,
          publishVideo: false,
          publishAudio: true
        });
        newSession.publish(pub);
        setPublisher(pub);
      }

      setSession(newSession);
    })
    .catch((err) => {
      console.error('Error connecting to the session:', err);
    });

    return () => {
      if (session) session.disconnect();
    };
    // eslint-disable-next-line
  }, []);

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
            {/* clientData(=nickname) 표시 */}
            <p>{sub.stream.connection.data}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MeetingPage;
