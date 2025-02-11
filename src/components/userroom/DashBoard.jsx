import React, { useState, useEffect, useRef } from 'react';
import ProposalButton from './ProposalButton';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
const statusMap = {
  IN_PROGRESS: '진행중',
  BIDDING: '입찰중',
  BOOKING: '예약중',
  CONFIRMED: '확정됨',
};
// 테마에 따른 색상 반환 함수 (원래 있던 함수, 필요에 따라 사용)
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
const DashBoard = ({ selectedCard }) => {
  console.log('--selectedCard', selectedCard);
  const [imageUrl, setImageUrl] = useState('');
  const hasFetched = useRef(false); // fetch 여부를 추적
  if (!selectedCard) {
    // 데이터가 없을 경우 로딩 상태 표시
    return <p>로딩 중입니다...</p>;
  }
  useEffect(() => {
    // 일본과 관련된 랜덤 이미지를 가져오기
    if (hasFetched.currrnt) return;
    hasFetched.current = true;

    const fetchImage = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=${selectedCard.arrivalCity.name}&client_id=${apiKey}`,
      );
      const data = await response.json();
      setImageUrl(data?.urls?.regular);
    };

    fetchImage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-between p-8 bg-gray-100 md:flex-row">
      {/* 여행 이미지 */}
      <div className="relative">
        <span
          className={`absolute top-6 left-2 px-3 py-1 rounded-full text-sm font-semibold ${
            selectedCard.planningStatus === 'IN_PROGRESS'
              ? 'bg-progress text-white'
              : selectedCard.planningStatus === 'BIDDING'
              ? 'bg-proposal text-white'
              : selectedCard.planningStatus === 'BOOKING'
              ? 'bg-reservation text-white'
              : 'bg-confirmed text-white'
          }`}
        >
          {statusMap[selectedCard.planningStatus]}
        </span>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Travel"
            className="object-cover w-full h-64 rounded-lg shadow-md md:w-96"
          />
        )}
        {/* 이미지 왼쪽 상단에 planningStatus 추가 */}
      </div>

      {/* 여행 패키지 정보 */}
      <div className="p-4 md:w-1/3">
        <h2 className="mb-4 text-2xl font-bold">
          {selectedCard?.name || '기본 이름'}
        </h2>
        <p className="text-gray-700">
          {selectedCard.startDate} ~ {selectedCard.endDate}
        </p>
        <p className="text-gray-700">{selectedCard.arrivalCity.name}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          <strong>테마:</strong>
          {selectedCard.keywords && selectedCard.keywords.length > 0 ? (
            selectedCard.keywords.map((keyword, index) => (
              <span
                key={index}
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getThemeColor(
                  keyword.name,
                )}`}
              >
                {keyword.name}
              </span>
            ))
          ) : (
            <span className="text-sm text-gray-500">키워드가 없습니다.</span>
          )}
        </div>
      </div>

      {/* 여행사에 제안하기 버튼 컴포넌트 사용 */}
      <ProposalButton
        travelPlanId={selectedCard.travelPlanId}
        currentParticipants={selectedCard.currentParticipants}
        minPeople={selectedCard.minPeople}
      />
    </div>
  );
};

export default DashBoard;
