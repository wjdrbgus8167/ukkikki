import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]); // 메시지 목록
  const [input, setInput] = useState(''); // 입력 메시지
  const socketRef = useRef(null); // 웹소켓 참조

  const backendUrl = import.meta.env.VITE_APP_API_BASE_URL;

  useEffect(() => {
    // 웹소켓 연결
    const socket = new WebSocket(`${backendUrl.replace('http', 'ws')}/chat`);
    socketRef.current = socket;

    // 메시지 수신 이벤트
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    // 연결 종료 시 정리
    socket.onclose = () => {
      console.log('웹소켓 연결이 종료되었습니다.');
    };

    return () => {
      socket.close(); // 컴포넌트 언마운트 시 웹소켓 종료
    };
  }, [backendUrl]);

  // 메시지 전송 핸들러
  const sendMessage = () => {
    if (input.trim() && socketRef.current) {
      const message = { content: input, timestamp: new Date().toISOString() };
      socketRef.current.send(JSON.stringify(message)); // 메시지 전송
      setMessages((prevMessages) => [...prevMessages, message]); // 전송된 메시지 로컬 추가
      setInput(''); // 입력 초기화
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 표시 */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-md">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-md ${
              index % 2 === 0 ? 'bg-blue-100 text-blue-900' : 'bg-gray-300 text-gray-800'
            }`}
          >
            <span>{msg.content}</span>
            <div className="text-xs text-gray-500">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>

      {/* 입력창 */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chat;