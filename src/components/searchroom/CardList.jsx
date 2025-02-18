import React, { useState, useEffect } from 'react';
import useRoomModal from './useRoomModal'; // ➀ 커스텀 훅 import
import RoomModal from './RoomModal';
import logo from '../../assets/loading-spinner.png';
import { useNavigate } from 'react-router-dom'; // ✅ 메인페이지 이동을 위한 useNavigate 추가

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
const statusMap = {
  IN_PROGRESS: '진행중',
  BIDDING: '입찰중',
  BOOKING: '예약중',
  CONFIRMED: '확정됨',
};

const getThemeColor = (theme) => {
  const themeColors = {
    골프: 'bg-golf text-white',
    '관광+휴양': 'bg-tourism-relaxation text-white',
    식도락: 'bg-food text-white',
    현지문화체험: 'bg-local-culture text-white',
    기차여행: 'bg-train-trip text-white',
    SNS핫플: 'bg-sns-hot text-white',
    럭셔리: 'bg-luxury text-white',
    해양스포츠: 'bg-marine-sports text-white',
    온천: 'bg-hot-spring text-white',
    성지순례: 'bg-pilgrimage text-white',
    '디저트 골프': 'bg-dessert-golf text-white',
    축구: 'bg-soccer text-white',
  };
  return themeColors[theme] || 'bg-gray-500 text-white';
};

const CardList = ({ cards }) => {
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate(); // ✅ 메인페이지 이동을 위한 훅 사용

  // ✅ useEffect를 실행 전에 항상 실행되도록 유지
  useEffect(() => {
    const fetchImages = async () => {
      if (!Array.isArray(cards) || cards.length === 0) return;

      const newImages = {};
      for (const card of cards) {
        if (!newImages[card.country]) {
          try {
            const response = await fetch(
              `https://api.unsplash.com/photos/random?query=${card.country}&client_id=${apiKey}`,
            );
            const data = await response.json();
            newImages[card.country] =
              data?.urls?.regular || '/default-image.jpg';
          } catch (error) {
            console.error('이미지 불러오기 실패:', error);
            newImages[card.country] = '/default-image.jpg';
          }
        }
      }
      setImageUrls((prev) => ({ ...prev, ...newImages }));
    };

    fetchImages();
  }, [cards]); // ✅ `apiKey` 제거 (변경되지 않는 값이므로)

  // ➁ useRoomModal 훅 사용
  const {
    isModalOpen,
    currentStep,
    selectedCard,
    people,
    openModal,
    closeModal,
    nextStep,
    prevStep,
    handlePeopleChange,
    handleIncrement,
    handleDecrement,
    handleComplete,
  } = useRoomModal();

  // ✅ 조기 return을 useEffect 이후로 이동
  if (!Array.isArray(cards) || cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full mt-16 space-y-4">
        <img src={logo} alt="바나나 로고" className="w-16 h-16" />
        <p className="text-center text-gray-500">
          검색 결과가 없습니다. <br />
          다른 조건으로 검색해보세요.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 mt-4 text-white rounded-md bg-brown hover:bg-yellow hover:text-brown hover:font-bold"
        >
          메인페이지로 가기
        </button>
      </div>
    );
  }

  return (
    <>
      {/* 카드 리스트 */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col justify-between h-full p-6 bg-white border border-gray-200 rounded-md shadow-lg"
          >
            <div className="relative">
              <span
                className={`absolute top-6 left-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  statusMap[card.planningStatus]
                    ? {
                        IN_PROGRESS: 'bg-progress text-white',
                        BIDDING: 'bg-proposal text-white',
                        BOOKING: 'bg-reservation text-white',
                        CONFIRMED: 'bg-confirmed text-white',
                      }[card.planningStatus]
                    : 'bg-gray-400 text-white'
                }`}
              >
                {statusMap[card.planningStatus] || '상태 없음'}
              </span>

              <img
                src={imageUrls[card.country] || '/default-image.jpg'}
                alt={card.country}
                className="object-cover w-full h-64 mt-4 rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-col flex-grow mt-4 space-y-4">
              {/* 방 제목 */}
              <h3 className="text-xl font-bold truncate">{card.name}</h3>

              {/* 모집 진행률 바 */}
              <div className="flex flex-col mt-4 space-y-2">
                <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow"
                    style={{
                      width: `${
                        card.minPeople > 0 && card.currentParticipants
                          ? Math.min(
                              (card.currentParticipants / card.minPeople) * 100,
                              100,
                            ) // 100% 초과 방지
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>현재 인원: {card.maxPeople}명</span>
                  <span>최소 모집인원: {card.minPeople}명</span>
                </div>
              </div>

              {/* 여행 도시 */}
              <p className="text-black">
                <strong>여행지:</strong> {card.arrivalCity.name}
              </p>
              {/* 여행 날짜 */}
              <p className="text-black">
                <strong>여행 날짜:</strong> {card.startDate} ~ {card.endDate}
              </p>

              {/* 여행 테마 (키워드 ID 표시) */}
              <div className="flex flex-wrap gap-2 mb-4">
                <strong>여행 테마:</strong>
                {card.keywords && card.keywords.length > 0 ? (
                  card.keywords.map((keyword, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 text-sm font-semibold rounded-full ${getThemeColor(
                        keyword.name,
                      )}`}
                    >
                      {keyword.name}
                    </span>
                  ))
                ) : (
                  <span className="px-3 py-1 text-sm font-semibold text-gray-500 rounded-full">
                    테마 없음
                  </span>
                )}
              </div>
            </div>

            {/* 버튼: 자세히 보기 => 모달 열기 */}
            <button
              className="px-4 py-2 mt-4 text-white rounded-md bg-brown hover:bg-yellow hover:text-brown hover:font-bold"
              onClick={() => {
                console.log('선택된 카드:', card); // 카드 콘솔 출력
                // 이미 참여 중인 방이라면 바로 입장 처리
                if (card.hasJoined) {
                  navigate(`/user-room/${card.travelPlanId}`, {
                    state: { selectedCard: card },
                  });
                } else {
                  // 참여 중이 아니라면 모달을 열어서 자세히 보기 진행
                  openModal(card);
                }
              }}
            >
              자세히 보기
            </button>
          </div>
        ))}
      </div>

      {/* 2단계 모달 */}
      <RoomModal
        isOpen={isModalOpen}
        onClose={closeModal}
        step={currentStep}
        totalSteps={2}
        onNext={nextStep}
        onPrev={prevStep}
        selectedCard={selectedCard}
        people={people}
        handlePeopleChange={handlePeopleChange}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onComplete={handleComplete}
      />
    </>
  );
};

export default CardList;
