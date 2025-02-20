import React, { useEffect, useState } from "react";
import { OpenVidu } from "openvidu-browser";
import axios from "axios";

const APPLICATION_SERVER_URL = 'https://i12c204.p.ssafy.io:9443/api/v1'; // OpenVidu 서버 URL

export default function VideoRoom() {
  const [session, setSession] = useState(null);
  const [publisher, setPublisher] = useState(null);
  const [screenPublisher, setScreenPublisher] = useState(null);
  const [subscribers, setSubscribers] = useState([]);
  const [screenSubscribers, setScreenSubscribers] = useState([]);
  const [isHost, setIsHost] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("sessionId");
    const userToken = params.get("token");
    const role = params.get("role");

    setIsHost(role === "host");
    if (sessionId && userToken) {
      joinSession(sessionId, userToken);
    }
  }, []);

  const joinSession = (sessionId, token) => {
    const ov = new OpenVidu();
    const newSession = ov.initSession();

    newSession.on("streamCreated", (event) => {
      const newSubscriber = newSession.subscribe(event.stream, undefined);
      if (event.stream.typeOfVideo === "SCREEN") {
        setScreenSubscribers((prev) => [...prev, newSubscriber]);
      } else {
        setSubscribers((prev) => [...prev, newSubscriber]);
      }
    });

    newSession.on("streamDestroyed", (event) => {
      setSubscribers((prev) => prev.filter((sub) => sub.stream !== event.stream));
      setScreenSubscribers((prev) => prev.filter((sub) => sub.stream !== event.stream));
    });

    newSession.connect(token)
      .then(() => {
        if (isHost) {
          const newPublisher = ov.initPublisher(undefined, {
            videoSource: undefined,
            audioSource: undefined,
            publishVideo: true,
            publishAudio: true,
          });
          newSession.publish(newPublisher);
          setPublisher(newPublisher);
        }
      })
      .catch((error) => console.error("Connection error", error));

    setSession(newSession);
  };

  const startScreenShare = () => {
    if (!session || screenPublisher) return;

    const ov = new OpenVidu();
    const newScreenPublisher = ov.initPublisher(undefined, {
      videoSource: "screen",
      publishVideo: true,
      publishAudio: false,
    });

    newScreenPublisher.once("accessAllowed", () => {
      session.publish(newScreenPublisher);
      setScreenPublisher(newScreenPublisher);
      setScreenSharing(true);
    });
  };

  const stopScreenShare = () => {
    if (screenPublisher) {
      screenPublisher.stream.dispose();
      setScreenPublisher(null);
      setScreenSharing(false);
    }
  };

  return (
    <div>
      <h1>OpenVidu Video Room</h1>
      <div>
        {publisher && <video autoPlay ref={(ref) => ref && (ref.srcObject = publisher.stream.getMediaStream())} />}
        {screenSubscribers.map((sub, i) => (
          <video key={i} autoPlay ref={(ref) => ref && (ref.srcObject = sub.stream.getMediaStream())} />
        ))}
      </div>
      {isHost && (
        <button onClick={screenSharing ? stopScreenShare : startScreenShare}>
          {screenSharing ? "Stop Screen Share" : "Start Screen Share"}
        </button>
      )}
    </div>
  );
}
