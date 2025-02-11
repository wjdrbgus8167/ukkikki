import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import DashBoard from '../components/userroom/DashBoard';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);

  // 우선, URL에서 travelPlanId를 가져오고, 만약 location.state가 없다면 이를 사용하도록 함
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
    <div>
      <Header />
      <div className="container px-8 py-8 mx-auto">
        <DashBoard selectedCard={selectedCard} />
        <InteractiveSection selectedCard={selectedCard} />
      </div>
      <Footer />
    </div>
  );
};

export default UserRoom;
