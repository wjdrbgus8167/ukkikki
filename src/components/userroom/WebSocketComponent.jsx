import { useEffect, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import Swal from "sweetalert2";

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

const WebSocketComponent = ({ travelPlanId, setFavorites, favorites, fetchRoomData }) => {
  // 디버깅을 위한 로그 추가
  console.log('WebSocketComponent props:', {
    travelPlanId,
    hasFetchRoomData: !!fetchRoomData,
    type: typeof fetchRoomData
  });

  const handleUpdate = useCallback(async (message) => {
    try {

      if (typeof fetchRoomData === 'function') {
        await fetchRoomData(travelPlanId);
      } else {
        console.error('fetchRoomData is not a function:', fetchRoomData);
      }
      const eventData = JSON.parse(message.body);
      console.log("📍 실시간 이벤트 수신:", eventData);

      // ✅ 오른쪽 위에 알림(Toast) 띄우기
      Swal.fire({
        toast: true,
        position: "top-end", // 🔥 오른쪽 위에 표시
        icon: "info", // 기본 아이콘 (정보)
        title: `${eventData.memberName}님이 ${eventData.placeName} ${getActionText(eventData.action)}`,
        showConfirmButton: false,
        timer: 3000, // 3초 후 자동 닫힘
        timerProgressBar: true, // 진행 바 표시
      });


    } catch (error) {
      console.error('Update handling error:', error);
    }
  }, [travelPlanId, fetchRoomData]);

  useEffect(() => {
    if (!travelPlanId || typeof fetchRoomData !== 'function') {
      console.error('Required props missing:', { travelPlanId, fetchRoomData });
      return;
    }

    stompClient.onConnect = () => {
      console.log('✅ STOMP WebSocket 연결됨');

      stompClient.subscribe(
        `/sub/actions/travel-plan/${travelPlanId}`,
        handleUpdate
      );

      console.log('✅ STOMP 구독완료');
    };

    stompClient.onDisconnect = () => {
      console.log('❌ STOMP WebSocket 연결 종료');
    };

    stompClient.onStompError = (frame) => {
      console.error('🚨 STOMP WebSocket 에러 발생:', frame.headers['message']);
    };

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
        console.log('🛑 STOMP WebSocket 종료');
      }
    };
  }, [travelPlanId, fetchRoomData, handleUpdate]);

  return null;
};

export default WebSocketComponent;