import React, { useState, useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const Chat = ({ travelPlanId }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const stompClientRef = useRef(null);

  useEffect(() => {
    // SockJS를 이용한 WebSocket 연결 (엔드포인트: api/v1/ws)
    const socket = new SockJS('http://i12c204.p.ssafy.io:8080/api/v1/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      debug: () => {}, // 디버그 로그 비활성화
      reconnectDelay: 5000, // 자동 재연결 (5초)
      onConnect: () => {
        console.log('✅ WebSocket 연결 성공');

        // 채팅방 입장 메시지 전송
        client.publish({
          destination: '/api/v1/pub/chat/enter',
          body: JSON.stringify({ travelPlanId }),
        });

        // 채팅방 구독 (여행 플랜에 해당하는 채팅)
        client.subscribe(
          `/api/v1/sub/chat/travel-plan/${travelPlanId}`,
          (message) => {
            if (message.body) {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prev) => [...prev, receivedMessage]);
            }
          },
        );
      },
      onStompError: (frame) => {
        console.error('STOMP 에러:', frame.headers['message'], frame.body);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [travelPlanId]);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (input.trim() !== '' && stompClientRef.current?.connected) {
      const message = {
        travelPlanId,
        content: input,
        sender: '사용자', // 실제로는 사용자 정보를 넣어야 합니다.
        timestamp: new Date().toISOString(),
      };

      // 메시지 전송: /api/v1/pub/chat/message
      stompClientRef.current.publish({
        destination: '/api/v1/pub/chat/message',
        body: JSON.stringify(message),
      });

      setInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.sender}</strong>: {msg.content}
          </div>
        ))}
      </div>
      <div className="flex items-center p-4 border-t">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          onClick={sendMessage}
          className="px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chat;
