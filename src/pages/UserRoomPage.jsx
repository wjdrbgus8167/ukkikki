import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';

const UserRoom = () => {
  const location = useLocation();
  const [selectedCard, setSelectedCard] = useState(
    location.state?.selectedCard,
  );
  console.log('📌 UserRoom.jsx - selectedCard:', selectedCard);

  useEffect(() => {
    if (!selectedCard) {
      console.log('🔍 selectedCard가 없음 → 백엔드에서 데이터 요청');
      fetchRoomData();
    }
  }, []);

  const fetchRoomData = async () => {
    try {
      const response = await publicRequest.get(`/api/v1/travel-plans`);
      console.log('✅ 여행방 데이터 다시 가져오기:', response.data);
      if (response.data?.data?.travelPlans) {
        setSelectedCard(response.data.data.travelPlans[0]); // 첫 번째 방을 기본으로 설정
      }
    } catch (error) {
      console.error('🚨 여행방 데이터 가져오기 실패:', error);
    }
  };

  if (!selectedCard) {
    return (
      <div className="p-10 text-center text-red-500">
        🚨 여행방 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div>
      <DashBoard selectedCard={selectedCard} />
    </div>
  );
};

export default UserRoom;
