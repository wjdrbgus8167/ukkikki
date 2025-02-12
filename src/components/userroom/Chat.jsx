import React, { useState, useEffect, useRef } from 'react';
import { publicRequest } from '../../hooks/requestMethod';
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

const Chat = ({ travelPlanId }) => {
  const [messages, setMessages] = useState([]); // 채팅 메시지 목록
  const [inputMessage, setInputMessage] = useState(''); // 입력 중인 메시지
  const [stompClient, setStompClient] = useState(null); // STOMP 클라이언트
  const chatContainerRef = useRef(null); // 채팅 컨테이너 참조 (스크롤 조정용)

  // WebSocket 연결 설정
  useEffect(() => {
    const socket = new SockJS(
      `${import.meta.env.VITE_APP_API_BASE_URL}api/v1/ws`,
    );
    const client = over(socket);

    client.connect({}, () => {
      console.log('WebSocket 연결 성공');
      setStompClient(client);

      // 채팅방 구독
      client.subscribe(
        `api/v1/sub/chat/travel-plan/${travelPlanId}`,
        (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        },
      );

      // 채팅방 입장 메시지 전송
      client.send(
        'api/v1/pub/chat/enter',
        {},
        JSON.stringify({ travelPlanId, type: 'ENTER' }),
      );
    });

    return () => {
      if (client) {
        client.disconnect();
        console.log('WebSocket 연결 종료');
      }
    };
  }, [travelPlanId]);

  // 메시지 전송
  const sendMessage = () => {
    if (inputMessage.trim() && stompClient) {
      const message = {
        travelPlanId,
        sender: '사용자', // 실제로는 사용자 ID 또는 이름을 사용
        content: inputMessage,
        type: 'TALK',
      };

      stompClient.send('api/v1/pub/chat/message', {}, JSON.stringify(message));
      setInputMessage('');
    }
  };

  // 채팅 컨테이너 스크롤을 항상 아래로 유지
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 목록 */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-100"
      >
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
            className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
