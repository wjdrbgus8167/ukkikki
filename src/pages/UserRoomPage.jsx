import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { publicRequest } from '../hooks/requestMethod';
import InteractiveSection from '../components/userroom/InteractiveSection';
import Header from '../components/layout/Header';
import FavoriteList from '../components/userroom/FavoriteList';
import { LoadScript } from '@react-google-maps/api';
import WebSocketComponent from '../components/userroom/WebSocketComponent';
import Swal from 'sweetalert2';
import BoardingPass from '../components/userroom/BoardingPass';
import Draggable from 'react-draggable';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserRoom = () => {
  const { travelPlanId: travelPlanIdFromUrl } = useParams();
  const location = useLocation();
  const initialSelectedCard = location.state?.selectedCard;
  const [selectedCard, setSelectedCard] = useState(initialSelectedCard || {});
  const [isLikeListOpen, setIsLikeListOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 35.6895, lng: 139.6917 });
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // 추가 UI 상태 (예: isSmall) 관리
  const [isSmall, setIsSmall] = useState(false);

  const libraries = ['places'];
  const travelPlanId = selectedCard?.travelPlanId || travelPlanIdFromUrl;

  const disabled = ['BIDDING', 'BOOKING', 'CONFIRMED'].includes(
    selectedCard.planningStatus,
  );
  const handleDisabledClick = useCallback((e) => {
    e.stopPropagation();
    Swal.fire({
      title: '기능 제한',
      html: '현재 여행방 상태가 요청중, 예약중, 또는 여행확정 상태이므로 <br>일부 기능은 제한됩니다.',
      icon: 'warning',
      confirmButtonText: '확인',
    });
  }, []);

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
        setSelectedCard(travelPlan);
      }
    } catch (error) {
      console.error('🚨 여행방 데이터 가져오기 실패:', error);
    }
  }, []);

  useEffect(() => {
    if (isInitialLoad && selectedCard && selectedCard.arrivalCity?.name) {
      const city = selectedCard.arrivalCity.name;
      const getCoordinates = async () => {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            setMapCenter({ lat, lng });
            setIsInitialLoad(false);
          }
        } catch (error) {
          console.error('🚨 Geocoding 요청 실패:', error);
        }
      };
      getCoordinates();
    }
  }, [selectedCard, isInitialLoad]);

  useEffect(() => {
    if (travelPlanId) {
      fetchRoomData(travelPlanId);
    } else {
      console.error('🚨 travelPlanId가 없습니다.');
    }
  }, [travelPlanId, fetchRoomData]);

  const DraggableBoardingPass = ({ selectedCard, isLikeListOpen }) => {
    const nodeRef = useRef(null);

    return (
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className="fixed z-50 pointer-events-auto"
          style={{
            top: '80px',
            left: isLikeListOpen ? '330px' : '0px',
          }}
        >
          <BoardingPass
            selectedCard={selectedCard}
            isSmall={isSmall}
            setIsSmall={setIsSmall}
          />
        </div>
      </Draggable>
    );
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
      libraries={libraries}
      onLoad={() => console.log('Google Maps API script loaded!')}
      onError={(error) =>
        console.error('🚨 Google Maps API script failed to load:', error)
      }
    >
      <WebSocketComponent
        travelPlanId={travelPlanId}
        fetchRoomData={fetchRoomData}
        setFavorites={setFavorites}
        favorites={favorites}
      />
      <div className="flex flex-col w-screen h-screen overflow-hidden">
        <Header />
        <div className="relative flex-1">
          <div className="absolute inset-0 z-0">
            <InteractiveSection
              selectedCard={selectedCard}
              favorites={favorites}
              setFavorites={setFavorites}
              isInteractionDisabled={disabled}
              mapCenter={mapCenter}
            />
          </div>
          {disabled && (
            <div
              className="absolute inset-0 z-10"
              onClick={handleDisabledClick}
              style={{ cursor: 'not-allowed' }}
            />
          )}
          <div className="relative flex h-full pointer-events-none">
            <div className="flex h-full pointer-events-none">
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
                      setMapCenter={setMapCenter}
                    />
                    {disabled && (
                      <div
                        className="absolute inset-0 z-10"
                        onClick={handleDisabledClick}
                        style={{ cursor: 'not-allowed' }}
                      />
                    )}
                  </div>
                )}
              </div>
              <DraggableBoardingPass
                selectedCard={selectedCard}
                isLikeListOpen={isLikeListOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </LoadScript>
  );
};

export default UserRoom;
