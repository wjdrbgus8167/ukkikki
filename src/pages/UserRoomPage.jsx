import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OverviewBar from '../components/userroom/OverviewBar';
import FavoriteList from '../components/userroom/FavoriteList';
import { LoadScript } from '@react-google-maps/api';
import WebSocketComponent, { stompClient } from '../components/userroom/WebSocketComponent';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);
  const [isLikeListOpen, setIsLikeListOpen] = useState(true);
  // ★ 부모에서 좋아요 리스트 상태를 관리
  const [favorites, setFavorites] = useState([]);
  const libraries = ['places'];

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
      const response = await publicRequest.get(
        `/api/v1/travel-plans/${id}/members`,
      );
      if (response.data?.data?.travelPlan) {
        const travelPlan = response.data.data.travelPlan;

        const mappedPlaces = (travelPlan.places || []).map((place) => ({
          ...place,
          isLiked: place.likeYn,
        }));
        setSelectedCard(travelPlan);
        setFavorites(mappedPlaces);

        console.log('✅ 여행방 데이터:', travelPlan);
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
    <LoadScript
      googleMapsApiKey={apiKey}
      libraries={libraries} // 상수 사용
      onLoad={() => console.log('Google Maps API script loaded!')}
      onError={(error) =>
        console.error('🚨 Google Maps API script failed to load:', error)
      }
    >
      <div className="flex flex-col min-h-screen">
        <Header />
        <OverviewBar selectedCard={selectedCard} />
        <div className="relative flex flex-1">
          <div
            className={`absolute left-0 top-0 h-full transition-transform duration-300 ${
              isLikeListOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ width: '320px', zIndex: 10 }}
          >
            <div className="relative h-full bg-white ">
              {/* ★ FavoriteList 에 부모 상태 전달 */}
              <FavoriteList
                selectedCard={selectedCard}
                favorites={favorites}
                setFavorites={setFavorites}
              />


  <WebSocketComponent 
  travelPlanId={travelPlanId} 
  fetchRoomData={fetchRoomData} 
  setFavorites={setFavorites} 
  favorites={favorites} 
/>

              <button
                onClick={() => setIsLikeListOpen(false)}
                className="absolute top-1/2 right-[-40px] transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-lg"
              >
                ❮
              </button>
            </div>
          </div>
          <div className="flex flex-1 h-full">
            {!isLikeListOpen && (
              <button
                onClick={() => setIsLikeListOpen(true)}
                className="absolute z-20 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-lg top-1/2 left-2"
              >
                ❯
              </button>
            )}
            {/* ★ InteractiveSection 에도 부모 상태 전달 */}
            <div className="flex-1">
              <InteractiveSection
                selectedCard={selectedCard}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </LoadScript>
  );
};

export default UserRoom;
