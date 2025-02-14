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
    console.log('Updated messages:', messages);
  }, [messages]);

  useEffect(() => {
    const baseUrl = 'https://i12c204.p.ssafy.io'; // HTTP 서버 주소
    const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws'; 
    const wsUrl = `${wsProtocol}://${baseUrl.split('//')[1]}/api/v1/ws`; 
    
    console.log('WebSocket 연결 시도:', wsUrl);
    const socket = new WebSocket(wsUrl);
    const client = over(socket);

    client.connect(
      {},
      () => {
        console.log('WebSocket 연결 성공');
        setStompClient(client);
        setIsConnected(true);

        // 구독 콜백 예시
        client.subscribe(`/sub/chat/travel-plan/${travelPlanId}`, (message) => {
          console.log('메시지 수신:', message.body); // 이 메시지가 출력되는지 확인
          try {
            const newMessage = JSON.parse(message.body);
            console.log('파싱된 메시지:', newMessage); // 이 메시지가 출력되는지 확인
            setMessages((prev) => [...prev, newMessage]);
          } catch (error) {
            console.error('메시지 파싱 에러:', error);
          }
        });

        setTimeout(() => {
          try {
            client.send(
              `/pub/chat/enter`,
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
      try {
        if (client && client.ws && client.ws.readyState === WebSocket.OPEN) {
          client.disconnect(() => {
            console.log('WebSocket 연결 종료');
          });
        } else {
          console.log(
            'WebSocket이 아직 OPEN 상태가 아니므로 disconnect 호출 건너뜀',
          );
        }
      } catch (error) {
        console.error('disconnect 호출 중 에러:', error);
      }
    };
  }, [travelPlanId]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (!isConnected || !stompClient) {
      console.warn('WebSocket 연결이 아직 완료되지 않았습니다.');
      return;
    }
    if (inputMessage.trim() === '') return;

    const message = {
      travelPlanId,
      sender: '사용자', // 실제 사용자 정보로 대체
      content: inputMessage,
      type: 'TALK',
    };

    try {
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify(message));
    } catch (err) {
      console.error('메시지 전송 에러:', err);
    }
    setInputMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* 채팅 메시지 목록 */}
      <div
        ref={chatContainerRef}
        className="flex-1 p-4 overflow-y-auto bg-gray-100"
      >
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            채팅 메시지가 없습니다.
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === '사용자' ? 'justify-end' : 'justify-start'
              } mb-4`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === '사용자'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 text-gray-800'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 메시지 입력창 */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                sendMessage();
              }
            }}
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
