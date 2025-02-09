import React, { useState, useEffect } from 'react';
import useRoomModal from './useRoomModal'; // ➀ 커스텀 훅 import
import RoomModal from './RoomModal';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

// 테마에 따른 색상 반환 함수
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
  if (!Array.isArray(cards)) {
    console.error('🚨 오류: cards가 배열이 아닙니다.', cards);
    return (
      <p className="text-center text-red-500">
        여행방 데이터를 불러오는 중 오류가 발생했습니다. <br />
        잠시 후 다시 시도해 주세요.
      </p>
    );
  }
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

  // ------------------------------
  // 이미지 불러오기 (Unsplash)
  // ------------------------------
  useEffect(() => {
    const fetchImages = async () => {
      for (const card of cards) {
        if (!imageUrls[card.country]) {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${card.country}&client_id=${apiKey}`,
          );
          const data = await response.json();
          setImageUrls((prev) => ({
            ...prev,
            [card.country]: data?.urls?.regular,
          }));
        }
      }
    };
    fetchImages();
  }, [cards]);

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
                  card.status === '진행중'
                    ? 'bg-progress text-white'
                    : card.status === '제안중'
                    ? 'bg-proposal text-white'
                    : card.status === '예약중'
                    ? 'bg-reservation text-white'
                    : 'bg-confirmed text-white'
                }`}
              >
                {card.status}
              </span>
              <img
                src={imageUrls[card.country] || '/default-image.jpg'}
                alt={card.country}
                className="object-cover w-full h-64 mt-4 rounded-lg shadow-md"
              />
            </div>

            <div className="flex flex-col flex-grow mt-4 space-y-4">
              {/* 방 제목 */}
              <h3 className="text-xl font-bold truncate">{card.title}</h3>

              {/* 모집 진행률 바 */}
              <div className="flex flex-col mt-4 space-y-2">
                <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-yellow"
                    style={{
                      width: `${(card.people / card.min_people) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm font-medium text-gray-600">
                  <span>현재 인원: {card.people}명</span>
                  <span>최소 모집인원: {card.min_people}명</span>
                </div>
              </div>

              {/* 여행 날짜 */}
              <p className="text-gray-600">
                <strong>여행 날짜:</strong> {card.start_date} ~ {card.end_date}
              </p>

              {/* 테마 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <strong>여행 테마:</strong>
                {card.theme.split(',').map((theme, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(
                      theme,
                    )}`}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* 버튼: 자세히 보기 => 모달 열기 */}
            <button
              className="px-4 py-2 mt-4 text-white rounded-md bg-brown hover:bg-yellow hover:text-brown hover:font-bold"
              onClick={() => openModal(card)} // ➂ 사용
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
