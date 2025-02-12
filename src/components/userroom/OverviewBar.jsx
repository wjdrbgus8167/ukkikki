import React, { useState, useEffect, useRef } from 'react';
import ProposalButton from './ProposalButton';

const apiKey = import.meta.env.VITE_APP_UNSPLASH_API_KEY;
const statusMap = {
  IN_PROGRESS: '진행중',
  BIDDING: '입찰중',
  BOOKING: '예약중',
  CONFIRMED: '확정됨',
};

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

const OverviewBar = ({ selectedCard }) => {
  const [imageUrl, setImageUrl] = useState('');
  const hasFetched = useRef(false);

  if (!selectedCard) {
    return <p>로딩 중입니다...</p>;
  }

  useEffect(() => {
    if (hasFetched.current) return;
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
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg shadow-md">
      {/* ✅ 방 상태 */}
      <div className="flex items-center">
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            statusMap[selectedCard.planningStatus]
              ? {
                  IN_PROGRESS: 'bg-progress text-white',
                  BIDDING: 'bg-proposal text-white',
                  BOOKING: 'bg-reservation text-white',
                  CONFIRMED: 'bg-confirmed text-white',
                }[selectedCard.planningStatus]
              : 'bg-gray-400 text-white'
          }`}
        >
          {statusMap[selectedCard.planningStatus]}
        </span>
      </div>

      {/* ✅ 방 제목 */}
      <h2 className="text-lg font-bold">{selectedCard?.name || '기본 이름'}</h2>

      {/* ✅ 여행지 */}
      <p className="text-gray-700">{selectedCard.arrivalCity.name}</p>

      {/* ✅ 여행 일정 */}
      <p className="text-right text-gray-700">
        {selectedCard.startDate} ~ {selectedCard.endDate}
      </p>

      {/* ✅ 여행사 제안 버튼 */}
      <ProposalButton
        travelPlanId={selectedCard.travelPlanId}
        currentParticipants={selectedCard.currentParticipants}
        minPeople={selectedCard.minPeople}
      />
    </div>
  );
};

export default OverviewBar;
