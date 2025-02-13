import React, { useState, useEffect, useRef } from 'react';
import { over } from 'stompjs';

const Chat = ({ travelPlanId }) => {
  if (!travelPlanId) {
    return (
      <div className="p-4 text-center">여행 계획 ID가 제공되지 않았습니다.</div>
    );
  }

  const [messages, setMessages] = useState([]); // 채팅 메시지 목록
  const [inputMessage, setInputMessage] = useState(''); // 입력 중인 메시지
  const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트
  const [isConnected, setIsConnected] = useState(false); // 연결 상태
  const chatContainerRef = useRef(null); // 스크롤 조정을 위한 ref

  useEffect(() => {
    try {
      // 환경변수에 설정된 API URL (https://...)를 WebSocket URL로 변환
      const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
      // HTTPS라면 wss://, HTTP라면 ws:// 사용
      const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
      const wsUrl = baseUrl.replace(/^https?/, wsProtocol) + 'api/v1/ws';
      console.log('WebSocket 연결 시도:', wsUrl);

      // 순수 WebSocket 사용
      const socket = new WebSocket(wsUrl);
      const client = over(socket); // STOMP 클라이언트 생성

      client.connect(
        {},
        () => {
          console.log('WebSocket 연결 성공');
          setStompClient(client);
          setIsConnected(true);

          // 채팅방 구독 (경로 앞에 슬래시 추가)
          client.subscribe(
            `/api/v1/sub/chat/travel-plan/${travelPlanId}`,
            (message) => {
              console.log('메시지 수신:', message.body);
              try {
                const newMessage = JSON.parse(message.body);
                setMessages((prev) => [...prev, newMessage]);
              } catch (error) {
                console.error('메시지 파싱 에러:', error);
              }
            },
          );

          // 연결 후 잠시 지연 후 "enter" 메시지 전송 (100ms 지연)
          setTimeout(() => {
            try {
              client.send(
                `/api/v1/pub/chat/enter`,
                {},
                JSON.stringify({ travelPlanId, type: 'ENTER' }),
              );
            } catch (err) {
              console.error('enter 메시지 전송 에러:', err);
            }
          }, 100);
        },
        (error) => {
          console.error('WebSocket 연결 실패:', error);
        },
      );

      return () => {
        if (client) {
          client.disconnect();
          console.log('WebSocket 연결 종료');
        }
      };
    } catch (error) {
      console.error('Chat useEffect 내부 오류:', error);
    }
  }, [travelPlanId]);

  // 새로운 메시지가 추가될 때마다 스크롤을 맨 아래로 유지
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (!isConnected) {
      console.warn('WebSocket 연결이 아직 완료되지 않았습니다.');
      return;
    }
    if (inputMessage.trim() && stompClient) {
      const message = {
        travelPlanId,
        sender: '사용자', // 실제 사용자 정보를 넣어주세요
        content: inputMessage,
        type: 'TALK',
      };

      try {
        stompClient.send(
          `/api/v1/pub/chat/message`,
          {},
          JSON.stringify(message),
        );
      } catch (err) {
        console.error('메시지 전송 에러:', err);
      }
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 목록 */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-100"
      >
        {messages.length === 0 && (
          <div className="text-center text-gray-500">
            채팅 메시지가 없습니다.
          </div>
        )}
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === '사용자' ? 'justify-end' : 'justify-start'
            } mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender === '사용자'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 메시지 입력창 */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border rounded-lg focus:outline-none"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            className={`px-4 py-2 text-white rounded-lg ${
              isConnected ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
            }`}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
