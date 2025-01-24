import React, { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;

const CardList = ({ cards }) => {
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchImages = async () => {
      // 각 카드의 나라별 이미지를 가져옵니다.
      for (const card of cards) {
        if (!imageUrls[card.country]) {  // 이미지가 없을 경우만 요청
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=${card.country}&client_id=${apiKey}`
          );
          const data = await response.json();
          setImageUrls((prevState) => ({
            ...prevState,
            [card.country]: data?.[0]?.urls?.regular, // 국가별 이미지 URL 저장
          }));
        }
      }
    };

    fetchImages();
  }, [cards]); // cards가 변경될 때마다 fetchImages 실행

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-md shadow-lg p-6 border border-gray-200 flex flex-col justify-between"
        >
          {/* 여행 이미지 */}
          <img
            src={imageUrls[card.country] || '/default-image.jpg'} // Fallback to a default image
            alt={card.country}
            className="w-full h-64 object-cover rounded-lg shadow-md mt-4"
          />

          <div className="flex flex-col mt-4 space-y-4">
            {/* 여행 방 상태 */}
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
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

            {/* 방 제목 */}
            <h3 className="font-bold text-xl">{card.title}</h3>

            {/* 방 인원 */}
            <p className="text-gray-600">
              <strong>방 인원:</strong> {card.people}명
            </p>

            {/* 여행 날짜 */}
            <p className="text-gray-600">
              <strong>여행 날짜:</strong> {card.date}
            </p>

            {/* 테마 */}
            <div className="flex flex-wrap gap-2">
              <strong>여행 테마:</strong>
              {card.theme.split(',').map((theme, index) => (
                <span
                  key={index}
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getThemeColor(theme)}`}
                >
                  {theme}
                </span>
              ))}
            </div>

            {/* 버튼 */}
            <button className="mt-4 bg-dark-green text-white px-4 py-2 rounded-md hover:bg-green-700">
              자세히 보기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// 테마에 따른 색상 반환 함수
const getThemeColor = (theme) => {
  const themeColors = {
    '골프': 'bg-golf text-white',
    '관광+휴양': 'bg-tourism-relaxation text-white',
    '식도락': 'bg-food text-white',
    '현지문화체험': 'bg-local-culture text-white',
    '기차여행': 'bg-train-trip text-white',
    'SNS핫플': 'bg-sns-hot text-white',
    '럭셔리': 'bg-luxury text-white',
    '해양스포츠': 'bg-marine-sports text-white',
    '온천': 'bg-hot-spring text-white',
    '성지순례': 'bg-pilgrimage text-white',
    '디저트 골프': 'bg-dessert-golf text-white',
    '축구': 'bg-soccer text-white',
  };
  return themeColors[theme] || 'bg-gray-500 text-white'; // 기본값
};

export default CardList;
