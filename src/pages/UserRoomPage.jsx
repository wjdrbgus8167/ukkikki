import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OverviewBar from '../components/userroom/OverviewBar';
import FavoriteList from '../components/userroom/FavoriteList';

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

  // travelPlanId 결정
  const travelPlanId = initialSelectedCard?.travelPlanId || travelPlanIdFromUrl;

  useEffect(() => {
    if (travelPlanId) {
      fetchRoomData(travelPlanId);
    } else {
      console.error(
        '🚨 travelPlanId가 없습니다. 올바른 ID를 전달했는지 확인하세요.',
      );
    }
  }, [travelPlanId]);

  const fetchRoomData = async (id) => {
    console.log('📌 API 요청 ID:', id);
    try {
      const response = await publicRequest.get(`/api/v1/travel-plans/${id}`);
      if (response.data?.data?.travelPlan) {
        setSelectedCard(response.data.data.travelPlan);
        console.log('✅ 여행방 데이터:', response.data.data.travelPlan);
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
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* ✅ 여행 개요 바 */}
      <OverviewBar selectedCard={selectedCard} />

      {/* ✅ FavoriteList + InteractiveSection을 가로 배치 */}
      <div className="flex flex-1 px-8 py-6">
        {/* 좌측: 좋아요 리스트 */}
        <div className="w-1/4 pr-4">
          <FavoriteList selectedCard={selectedCard} />
        </div>

        {/* ✅ 우측: 지도 + 채팅 */}
        <div className="w-3/4">
          <InteractiveSection selectedCard={selectedCard} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserRoom;
