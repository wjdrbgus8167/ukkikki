import React, { useEffect, useState, useCallback, useRef } from "react";
import { OpenVidu } from "openvidu-browser";

const APPLICATION_SERVER_URL = 'https://i12c204.p.ssafy.io:9443/api/v1';

export default function VideoRoom() {
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSubscribers, setScreenSubscribers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  
  const OV = useRef(new OpenVidu());
  
  // 세션 정리를 위한 cleanup 함수
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }
    
    if (publisher) {
      publisher.stream?.dispose();
    }
    
    if (screenPublisher) {
      screenPublisher.stream?.dispose();
    }
    
    setSession(null);
    setPublisher(null);
    setScreenPublisher(null);
    setSubscribers([]);
    setScreenSubscribers([]);
    setScreenSharing(false);
  }, [session, publisher, screenPublisher]);

  // 스트림 구독 핸들러
  const handleStreamCreated = useCallback((event) => {
    if (!session) return;
    
    try {
      const subscriber = session.subscribe(event.stream, undefined);
      
      subscriber.on('streamPlaying', () => {
        subscriber.videos[0].video.play()
          .catch(error => console.warn('Auto-play failed:', error));
      });
      
      if (event.stream.typeOfVideo === "SCREEN") {
        setScreenSubscribers(prev => [...prev, subscriber]);
      } else {
        setSubscribers(prev => [...prev, subscriber]);
      }
    } catch (error) {
      console.error('Error subscribing to stream:', error);
    }
  }, [session]);

  // 스트림 제거 핸들러
  const handleStreamDestroyed = useCallback((event) => {
    const streamId = event.stream.streamId;
    setSubscribers(prev => prev.filter(sub => sub.stream.streamId !== streamId));
    setScreenSubscribers(prev => prev.filter(sub => sub.stream.streamId !== streamId));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("sessionId");
    const userToken = params.get("token");
    const role = params.get("role");

    setIsHost(role === "host");
    
    if (sessionId && userToken) {
      joinSession(sessionId, userToken);
    }

    return () => {
      leaveSession();
    };
  }, [leaveSession]);

  const joinSession = async (sessionId, token) => {
    try {
      const newSession = OV.current.initSession();
      
      newSession.on("streamCreated", handleStreamCreated);
      newSession.on("streamDestroyed", handleStreamDestroyed);
      newSession.on("exception", (exception) => {
        console.warn("Session exception:", exception);
      });

      await newSession.connect(token);
      setSession(newSession);
      
      if (isHost) {
        const publisher = await createPublisher();
        if (publisher) {
          await newSession.publish(publisher);
          setPublisher(publisher);
        }
      }
      
      setConnectionError(null);
    } catch (error) {
      console.error("Session connection error:", error);
      setConnectionError(error.message);
      leaveSession();
    }
  };

  const createPublisher = async () => {
    try {
      const publisher = OV.current.initPublisher(undefined, {
        videoSource: undefined,
        audioSource: undefined,
        publishVideo: true,
        publishAudio: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
      });

      await publisher.once("accessAllowed");
      return publisher;
    } catch (error) {
      console.error("Publisher creation error:", error);
      return null;
    }
  };

  const startScreenShare = async () => {
    if (!session || screenPublisher) return;

    try {
      const newScreenPublisher = OV.current.initPublisher(undefined, {
        videoSource: "screen",
        publishVideo: true,
        publishAudio: false,
        resolution: "1920x1080",
        frameRate: 30,
      });

      await newScreenPublisher.once("accessAllowed");
      await session.publish(newScreenPublisher);
      
      newScreenPublisher.once("streamPlaying", () => {
        setScreenSharing(true);
      });
      
      setScreenPublisher(newScreenPublisher);
    } catch (error) {
      console.error("Screen sharing error:", error);
      if (error.name === 'ScreenShareError') {
        alert('Screen sharing permission denied');
      }
    }
  };

  const stopScreenShare = async () => {
    if (screenPublisher) {
      try {
        await session?.unpublish(screenPublisher);
        screenPublisher.stream?.dispose();
        setScreenPublisher(null);
        setScreenSharing(false);
      } catch (error) {
        console.error("Error stopping screen share:", error);
      }
    }
  };

  if (connectionError) {
    return (
      <div className="error-container">
        <h3>Connection Error</h3>
        <p>{connectionError}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="video-room-container">
      <h1>OpenVidu Video Room</h1>
      {publisher && (
        <div className="publisher-container">
          <video
            autoPlay
            playsInline
            muted
            ref={(ref) => {
              if (ref) {
                ref.srcObject = publisher.stream?.getMediaStream();
              }
            }}
          />
        </div>
      )}
      <div className="subscribers-container">
        {subscribers.map((subscriber, i) => (
          <div key={subscriber.stream.streamId} className="subscriber-video">
            <video
              autoPlay
              playsInline
              ref={(ref) => {
                if (ref) {
                  ref.srcObject = subscriber.stream?.getMediaStream();
                }
              }}
            />
          </div>
        ))}
      </div>
      <div className="screen-share-container">
        {screenSubscribers.map((subscriber, i) => (
          <div key={subscriber.stream.streamId} className="screen-share-video">
            <video
              autoPlay
              playsInline
              ref={(ref) => {
                if (ref) {
                  ref.srcObject = subscriber.stream?.getMediaStream();
                }
              }}
            />
          </div>
        ))}
      </div>
      {isHost && (
        <div className="controls">
          <button
            onClick={screenSharing ? stopScreenShare : startScreenShare}
            className={screenSharing ? "stop-share" : "start-share"}
          >
            {screenSharing ? "Stop Screen Share" : "Start Screen Share"}
          </button>
        </div>
      )}
    </div>
  );
}