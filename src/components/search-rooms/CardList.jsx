import React, { useState, useEffect } from "react";
import useRoomModal from "./useRoomModal";  // ➀ 커스텀 훅 import
import RoomModal from "./RoomModal";

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

// 테마에 따른 색상 반환 함수
const getThemeColor = (theme) => {
  const themeColors = {
    골프: "bg-golf text-white",
    "관광+휴양": "bg-tourism-relaxation text-white",
    식도락: "bg-food text-white",
    현지문화체험: "bg-local-culture text-white",
    기차여행: "bg-train-trip text-white",
    SNS핫플: "bg-sns-hot text-white",
    럭셔리: "bg-luxury text-white",
    해양스포츠: "bg-marine-sports text-white",
    온천: "bg-hot-spring text-white",
    성지순례: "bg-pilgrimage text-white",
    "디저트 골프": "bg-dessert-golf text-white",
    축구: "bg-soccer text-white",
  };
  return themeColors[theme] || "bg-gray-500 text-white";
};

const CardList = ({ cards }) => {
  const [imageUrls, setImageUrls] = useState({});

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
            `https://api.unsplash.com/photos/random?query=${card.country}&client_id=${apiKey}`
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-md shadow-lg p-6 border border-gray-200 flex flex-col justify-between h-full"
          >
            <div className="relative">
              <span
                className={`absolute top-6 left-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  card.status === "진행중"
                    ? "bg-progress text-white"
                    : card.status === "제안중"
                    ? "bg-proposal text-white"
                    : card.status === "예약중"
                    ? "bg-reservation text-white"
                    : "bg-confirmed text-white"
                }`}
              >
                {card.status}
              </span>
              <img
                src={imageUrls[card.country] || "/default-image.jpg"}
                alt={card.country}
                className="w-full h-64 object-cover rounded-lg shadow-md mt-4"
              />
            </div>

            <div className="flex flex-col mt-4 space-y-4 flex-grow">
              {/* 방 제목 */}
              <h3 className="font-bold text-xl truncate">{card.title}</h3>

              {/* 모집 진행률 바 */}
              <div className="flex flex-col space-y-2 mt-4">
                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${(card.people / card.min_people) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                  <span>현재 인원: {card.people}명</span>
                  <span>최소 모집인원: {card.min_people}명</span>
                </div>
              </div>

              {/* 여행 날짜 */}
              <p className="text-gray-600">
                <strong>여행 날짜:</strong> {card.date}
              </p>

              {/* 테마 */}
              <div className="flex flex-wrap gap-2 mb-4">
                <strong>여행 테마:</strong>
                {card.theme.split(",").map((theme, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(
                      theme
                    )}`}
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            {/* 버튼: 자세히 보기 => 모달 열기 */}
            <button
              className="mt-4 bg-dark-green text-white px-4 py-2 rounded-md hover:bg-green-700"
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
