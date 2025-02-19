import { format } from 'date-fns';
import React, { useState, useEffect, useRef } from 'react';
import { over } from 'stompjs';
import Swal from 'sweetalert2';
import { RiSendPlaneLine } from 'react-icons/ri';
import { publicRequest } from '../../hooks/requestMethod';

const Chat = ({ travelPlanId }) => {
  if (!travelPlanId) {
    Swal.fire({
      icon: 'warning',
      title: '여행 계획 ID 오류',
      text: '여행 계획 ID가 제공되지 않았습니다.',
      confirmButtonText: '확인',
    });
    return null;
  }

  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [stompClient, setStompClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [autoScrolled, setAutoScrolled] = useState(true);
  const initialFetchDone = useRef(false); // 추가: 초기 기록 로드 여부 추적

  const chatContainerRef = useRef(null);
  const topSentinelRef = useRef(null);
  const hasSentEnterRef = useRef(false);
  const chatSubscriptionRef = useRef(null);
  const historySubscriptionRef = useRef(null);
  const oldestMessageTime = useRef(null);
  const memberId = useRef(null);

  // ▼ 스크롤 맨 아래로 이동하는 함수
const scrollToBottom = () => {
  if (chatContainerRef.current) {
    const container = chatContainerRef.current;

    // 약간의 딜레이 후 실행 (렌더링 완료 후 동작)
    setTimeout(() => {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
      console.log("스크롤 내리기");
    }, 100); // 100ms 딜레이
  }
};


  // 채팅방 구독 함수
  const subscribeToChat = (client, travelPlanId) => {
    return client.subscribe(
      `/sub/chat/travel-plan/${travelPlanId}`,
      (message) => {
        try {
          const newMessage = JSON.parse(message.body);
          if (!memberId.current) {
            memberId.current = newMessage.memberId;
          }
          setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
          console.error('메시지 파싱 에러:', error);
        }
      },
    );
  };

  // history 구독 함수
  const subscribeToHistory = (client, travelPlanId) => {
    return client.subscribe(
      `/sub/chat/travel-plan/${travelPlanId}/history`,
      (response) => {
        const data = JSON.parse(response.body);
        if (data.messages.length > 0) {
          oldestMessageTime.current = data.messages[0].createdAt;
          const container = chatContainerRef.current;
          const prevScrollHeight = container ? container.scrollHeight : 0;

          // 중복 메시지 필터링
          const existingIds = new Set(messages.map(msg => msg.id)); // 메시지 ID 기반 필터링
          const filteredMessages = data.messages.filter(msg =>
            !existingIds.has(msg.id)
          );

          if (filteredMessages.length === 0) {
            setHasMoreMessages(data.hasMore);
            return;
          }

          setMessages((prev) => [...filteredMessages, ...prev]);

          // 스크롤 위치 보정
          setTimeout(() => {
            if (container) {
              container.scrollTop = container.scrollHeight - prevScrollHeight;
            }
          }, 50);
        }
        setHasMoreMessages(data.hasMore);
      },
    );
  };

  // history 요청 함수
  const fetchHistoryMessages = async () => {
    if (!hasMoreMessages) return;

    try {
      const response = await publicRequest.get(`/api/v1/chat/${travelPlanId}/history`, {
        params: {
          createdAtBefore: oldestMessageTime.current || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS"),
        },
      });

      if (response.data?.data?.messages) {
        const historyMessages = response.data.data.messages;

        if (historyMessages.length > 0) {
          oldestMessageTime.current = historyMessages[0].createdAt;
          const container = chatContainerRef.current;
          const prevScrollHeight = container ? container.scrollHeight : 0;

          setMessages((prev) => [...historyMessages, ...prev]);

          setTimeout(() => {
            if (container) {
              container.scrollTop = container.scrollHeight - prevScrollHeight;
            }
            scrollToBottom();
          }, 0);
        }

        setHasMoreMessages(response.data.data.hasMore);
      }
    } catch (error) {
      console.error("🚨 채팅 기록 가져오기 실패:", error);
    }
  };

  // ENTER 메시지 전송 (한 번만 전송)
  const sendEnterMessage = (client, travelPlanId) => {
    if (!hasSentEnterRef.current) {
      setTimeout(() => {
        try {
          client.send(`/pub/chat/enter`, {}, JSON.stringify({ travelPlanId }));
          hasSentEnterRef.current = true;
        } catch (err) {
          console.error('enter 메시지 전송 에러:', err);
        }
      }, 100);
    }
  };

  // 메시지 전송
  const sendMessage = () => {
    if (!isConnected || !stompClient || inputMessage.trim() === '') return;
    const message = { travelPlanId, content: inputMessage };

    try {
      stompClient.send(`/pub/chat/message`, {}, JSON.stringify(message));
      setInputMessage('');
      scrollToBottom(); // 즉시 스크롤 내림
    } catch (err) {
      console.error('메시지 전송 에러:', err);
    }
  };


  // Intersection Observer: 상단 sentinel 감지 시 history 요청
  useEffect(() => {
    if (!chatContainerRef.current) return;
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            fetchHistoryMessages(); // 상단 도달 시 추가 메시지 HTTP 요청
          }
        });
      },
      { root: chatContainerRef.current, threshold: 0.1 }
    );
  
    if (topSentinelRef.current) observer.observe(topSentinelRef.current);
    return () => observer.disconnect();
  }, []);
  
  // ▼ 새로운 메시지 도착 시 스크롤 처리
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    // 스크롤이 맨 아래 근처인지 확인 (100px 이내)
    const isNearBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 100;

    if (isNearBottom) {
      scrollToBottom();
    }
  }, [messages]); // messages가 변경될 때마다 실행

  // 최초 스크롤: 처음 메시지가 로드되면 컨테이너 하단으로 스크롤
  useEffect(() => {
    if (messages.length > 0 && chatContainerRef.current && !autoScrolled) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
      setAutoScrolled(true);
    }
  }, [messages, autoScrolled]);

  // WebSocket 연결 초기화 및 cleanup
  useEffect(() => {
    // 이미 연결되어 있으면 재연결하지 않음
    if (stompClient && stompClient.ws.readyState === WebSocket.OPEN) return;

    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const wsProtocol = baseUrl.startsWith('https') ? 'wss' : 'ws';
    const trimmedBaseUrl = baseUrl.endsWith('/')
      ? baseUrl.slice(0, -1)
      : baseUrl;
    const wsUrl = `${wsProtocol}://${trimmedBaseUrl.split('//')[1]}/api/v1/ws`;

    const socket = new WebSocket(wsUrl);
    const client = over(socket);

    client.connect(
      {},
      () => {
        setStompClient(client);
        setIsConnected(true);
        chatSubscriptionRef.current = subscribeToChat(client, travelPlanId);
        historySubscriptionRef.current = subscribeToHistory(
          client,
          travelPlanId,
        );
        sendEnterMessage(client, travelPlanId);

        // 초기 기록 로드 (한 번만 실행)
        if (!initialFetchDone.current) {
          fetchHistoryMessages();
          initialFetchDone.current = true;
          console.log("과거 기록 가져오기");
        }
      },
      (error) => {
        console.error('WebSocket 연결 실패:', error);
      },
    );

    // 재연결 로직 (onclose)
    socket.onclose = () =>
      setTimeout(() => {
        window.location.reload(); // 간단하게 페이지 새로고침
      }, 1000);

    return () => {
      if (chatSubscriptionRef.current) {
        chatSubscriptionRef.current.unsubscribe();
        chatSubscriptionRef.current = null;
      }
      if (historySubscriptionRef.current) {
        historySubscriptionRef.current.unsubscribe();
        historySubscriptionRef.current = null;
      }
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

  return (
    <div className="flex flex-col h-full">
      <div
        ref={chatContainerRef}
        className="flex-1 relative p-4 overflow-y-auto bg-gray-100 no-scrollbar"
      >
        <div ref={topSentinelRef} className="h-1 w-full" />
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            채팅 메시지가 없습니다.
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMyMessage = msg.memberId === memberId.current;
            return (
              <div
                key={index}
                className={`flex mb-4 w-full ${isMyMessage ? 'justify-end' : 'justify-start'
                  }`}
              >
                {/* 프로필 이미지 및 이름 */}
                {!isMyMessage && (
                  <div className="mr-2 flex flex-col items-center">
                    {msg.profileImageUrl ? (
                      <img
                        src={msg.profileImageUrl}
                        alt="상대방 프로필"
                        className="w-8 h-8 rounded-full shadow-lg"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 p-1 shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.667 0 8 1.333 8 4v2H4v-2c0-2.667 5.333-4 8-4zm0-2c-1.06 0-2.08-.421-2.828-1.172C8.421 8.08 8 7.06 8 6s.421-2.08 1.172-2.828C9.92 2.421 10.94 2 12 2s2.08.421 2.828 1.172C15.579 3.92 16 4.94 16 6s-.421 2.08-1.172 2.828C14.08 9.579 13.06 10 12 10z" />
                      </svg>
                    )}
                    <span className="text-xs mt-1 text-gray-500">
                      {msg.memberName || '익명'}
                    </span>
                  </div>
                )}

                {/* 말풍선 + 시간 */}
                <div
                  className={`flex flex-col flex-1 ${isMyMessage ? 'items-end' : 'items-start'
                    }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${isMyMessage
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800'
                      }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                  </div>
                  <p
                    className={`text-xs text-gray-500 mt-1 ${isMyMessage ? 'text-right' : 'text-left'
                      }`}
                  >
                    {format(new Date(msg.createdAt), 'yyyy-MM-dd HH:mm')}
                  </p>
                </div>

                {/* 내 프로필 이미지 및 이름 */}
                {isMyMessage && (
                  <div className="ml-2 flex flex-col items-center">
                    {msg.profileImageUrl ? (
                      <img
                        src={msg.profileImageUrl}
                        alt="내 프로필"
                        className="w-8 h-8 rounded-full shadow-lg"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 p-1 shadow-lg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 12c2.667 0 8 1.333 8 4v2H4v-2c0-2.667 5.333-4 8-4zm0-2c-1.06 0-2.08-.421-2.828-1.172C8.421 8.08 8 7.06 8 6s.421-2.08 1.172-2.828C9.92 2.421 10.94 2 12 2s2.08.421 2.828 1.172C15.579 3.92 16 4.94 16 6s-.421 2.08-1.172 2.828C14.08 9.579 13.06 10 12 10z" />
                      </svg>
                    )}
                    <span className="text-xs mt-1 text-gray-500">
                      {msg.memberName || '나'}
                    </span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

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
            className="flex-1 p-2 rounded-lg focus:outline-none"
            placeholder="메시지를 입력하세요..."
          />
          <button
            onClick={sendMessage}
            disabled={!isConnected}
            className={`flex items-center justify-center px-6 py-3 text-lg font-semibold text-white transition-colors duration-300 rounded-lg shadow-md focus:outline-none ${isConnected
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
              : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            <RiSendPlaneLine size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
