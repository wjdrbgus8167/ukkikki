import { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import OverviewBar from '../components/userroom/OverviewBar';
import FavoriteList from '../components/userroom/FavoriteList';
import { LoadScript } from '@react-google-maps/api';
import WebSocketComponent, {
  stompClient,
} from '../components/userroom/WebSocketComponent';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;

  const [selectedCard, setSelectedCard] = useState(initialSelectedCard);
  const [favorites, setFavorites] = useState([]);
  const [isLikeListOpen, setIsLikeListOpen] = useState(true); // 추가
  const libraries = ['places'];

  const travelPlanId = initialSelectedCard?.travelPlanId || travelPlanIdFromUrl;

  // fetchRoomData를 useCallback으로 메모이제이션
  const fetchRoomData = useCallback(async (id) => {
    console.log('📌 API 요청 ID:', id);
    if (!id) {
      console.error('🚨 ID가 없습니다');
      return;
    }

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
        setFavorites(mappedPlaces);

        console.log('✅ 여행방 데이터:', travelPlan);
        // 필요한 경우 setSelectedCard(travelPlan)도 호출할 수 있음
      }
    } catch (error) {
      console.error('🚨 여행방 데이터 가져오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    if (travelPlanId) {
      fetchRoomData(travelPlanId);
    } else {
      console.error(
        '🚨 travelPlanId가 없습니다. 올바른 ID를 전달했는지 확인하세요.',
      );
    }
  }, [travelPlanId, fetchRoomData]);

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
      libraries={libraries}
      onLoad={() => console.log('Google Maps API script loaded!')}
      onError={(error) =>
        console.error('🚨 Google Maps API script failed to load:', error)
      }
    >
      {/* WebSocketComponent 추가 */}
      <WebSocketComponent
        travelPlanId={travelPlanId}
        fetchRoomData={fetchRoomData}
        setFavorites={setFavorites}
        favorites={favorites}
      />

      <div className="flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="flex flex-1 overflow-hidden relative">
          {/* 사이드바 (FavoriteList) */}
          <div
            className={`h-full bg-white overflow-y-auto transition-all duration-300 ${
              isLikeListOpen ? 'w-80' : 'w-0'
            }`}
            style={{ minWidth: isLikeListOpen ? '320px' : '0' }}
          >
            {isLikeListOpen && (
              <FavoriteList
                selectedCard={selectedCard}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            )}
          </div>

          {/* 토글 버튼 - 사이드바와 메인 콘텐츠 사이에 위치 */}
          <button
            onClick={() => setIsLikeListOpen((prev) => !prev)}
            className="absolute top-1/2 -right-3 transform -translate-y-1/2 p-2 text-white bg-gray-800 rounded-full z-10"
          >
            {isLikeListOpen ? '❮' : '❯'}
          </button>

          {/* 우측 영역: OverviewBar와 InteractiveSection */}
          <div className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-none">
              <OverviewBar selectedCard={selectedCard} />
            </div>
            <div className="flex-1">
              <InteractiveSection
                selectedCard={selectedCard}
                favorites={favorites}
                setFavorites={setFavorites}
              />
            </div>
          </div>
        </div>

        {/* <Footer /> */}
      </div>
    </LoadScript>
  );
};

export default UserRoom;
