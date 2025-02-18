import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import Header from '../components/layout/Header';
import OverviewBar from '../components/userroom/OverviewBar';
import FavoriteList from '../components/userroom/FavoriteList';
import { LoadScript } from '@react-google-maps/api';
import WebSocketComponent from '../components/userroom/WebSocketComponent';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard || {}); // 초기값 설정
  const [isLikeListOpen, setIsLikeListOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const libraries = ['places'];

  const travelPlanId = selectedCard?.travelPlanId || travelPlanIdFromUrl; // selectedCard.travelPlanId 또는 URL의 travelPlanId 사용

  // disabled: planningStatus가 BIDDING, BOOKING, CONFIRMED이면 사용자 조작 차단 (OverviewBar 제외)
  const disabled = ['BIDDING', 'BOOKING', 'CONFIRMED'].includes(
    selectedCard.planningStatus,
  );

  // 여행방 데이터 가져오기
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
        setSelectedCard(travelPlan); // 여행방 데이터를 selectedCard에 업데이트
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
      {/* 웹소켓 연결 */}
      <WebSocketComponent
        travelPlanId={travelPlanId}
        fetchRoomData={fetchRoomData}
        setFavorites={setFavorites}
        favorites={favorites}
      />

      {/* 전체 화면 레이아웃 */}
      <div className="flex flex-col h-screen overflow-hidden">
        <Header />

        {/* 지도 + 왼쪽 사이드바 + 오른쪽 OverviewBar */}
        <div className="relative flex-1">
          {/* 지도 (배경 레이어) */}
          <div className="absolute inset-0 z-0">
            <InteractiveSection
              selectedCard={selectedCard}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>

          <div className="relative flex h-full pointer-events-none">
            {/* 왼쪽 사이드바 (즐겨찾기 목록) */}
            <div
              className={`transition-all duration-300 relative h-full ${
                disabled ? 'pointer-events-none' : 'pointer-events-auto'
              }`}
              style={{ width: isLikeListOpen ? '320px' : '0px' }}
            >
              <button
                onClick={() => setIsLikeListOpen((prev) => !prev)}
                className="absolute z-30 p-2 text-white transform -translate-y-1/2 bg-gray-800 rounded-full pointer-events-auto top-1/2 -right-4"
              >
                {isLikeListOpen ? '❮' : '❯'}
              </button>

              {isLikeListOpen && (
                <div className="h-full overflow-y-auto pointer-events-auto bg-white/70 backdrop-blur-sm">
                  <FavoriteList
                    selectedCard={selectedCard}
                    favorites={favorites}
                    setFavorites={setFavorites}
                    disabled={disabled}
                  />
                </div>
              )}
            </div>

            {/* 오른쪽: OverviewBar (사용자 조작 허용) */}
            <div className="flex-1 overflow-auto bg-transparent m-2 z-20">
              <OverviewBar selectedCard={selectedCard} />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default UserRoom;
