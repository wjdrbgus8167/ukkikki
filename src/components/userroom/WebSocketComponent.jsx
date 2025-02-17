import { useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
const trimmedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
const wsUrl = `${wsProtocol}://${trimmedBaseUrl.split('//')[1]}/api/v1/ws`;

export const stompClient = new Client({
  brokerURL: wsUrl,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

const WebSocketComponent = ({ travelPlanId, setFavorites }) => {
  useEffect(() => {
    stompClient.onConnect = () => {
      console.log('✅ STOMP WebSocket 연결됨');

      // ✅ 실시간 마커 업데이트 구독 (웹소켓에서 변경된 데이터만 반영)
      stompClient.subscribe(
        `/sub/likes/travel-plan/${travelPlanId}`,
        (message) => {
          const updatedPlace = JSON.parse(message.body);
          console.log('🔥 받은 마커 업데이트 데이터:', updatedPlace);

          // ✅ 기존 favorites는 그대로 두고, 웹소켓으로 받은 데이터만 업데이트
          setFavorites((prev) => {
            const existingMarker = prev.find(
              (fav) => fav.placeId === updatedPlace.placeId,
            );
            if (existingMarker) {
              return prev.map((fav) =>
                fav.placeId === updatedPlace.placeId ? updatedPlace : fav,
              );
            }
            return [...prev, updatedPlace]; // 새로운 장소라면 추가
          });
        },
      );
    };

    stompClient.onDisconnect = () => {
      console.log('❌ STOMP WebSocket 연결 종료');
    };

    stompClient.onStompError = (frame) => {
      console.error('🚨 STOMP WebSocket 에러 발생:', frame.headers['message']);
    };

    // ✅ WebSocket 연결 실행
    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log('🛑 STOMP WebSocket 종료');
      }
    };
  }, [travelPlanId, setFavorites]);

  return null;
};

export default WebSocketComponent;
