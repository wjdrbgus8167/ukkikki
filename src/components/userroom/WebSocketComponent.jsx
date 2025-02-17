import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

const WebSocketComponent = ({ travelPlanId, setFavorites }) => {
  const stompClientRef = useRef(null);

  useEffect(() => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate(); // 기존 연결 해제
    }

    const stompClient = new Client({
      brokerURL: `ws://${baseUrl}/ws`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.onConnect = () => {
      console.log("✅ STOMP WebSocket 연결됨");

      stompClient.subscribe(`/sub/likes/travel-plan/${travelPlanId}`, (message) => {
        const updatedPlace = JSON.parse(message.body);
        console.log("🔥 받은 마커 업데이트 데이터:", updatedPlace);

        setFavorites((prev) => {
          const existingMarker = prev.find((fav) => fav.placeId === updatedPlace.placeId);
          return existingMarker
            ? prev.map((fav) => (fav.placeId === updatedPlace.placeId ? updatedPlace : fav))
            : [...prev, updatedPlace];
        });
      });
    };

    stompClient.onDisconnect = () => {
      console.log("❌ STOMP WebSocket 연결 종료");
    };

    stompClient.onStompError = (frame) => {
      console.error("🚨 STOMP WebSocket 에러 발생:", frame.headers["message"]);
    };

    stompClient.activate();
    stompClientRef.current = stompClient; // 참조 저장

    return () => {
      stompClient.deactivate();
      console.log("🛑 STOMP WebSocket 종료");
    };
  }, [travelPlanId, setFavorites]);

  return null;
};

export default WebSocketComponent;
