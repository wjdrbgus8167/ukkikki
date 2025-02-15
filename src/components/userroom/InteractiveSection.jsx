import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, OverlayView } from '@react-google-maps/api';
import FavoriteList from './FavoriteList';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import bananaIcon from '../../assets/loading-spinner.png';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard }) => {
  console.log('InteractiveSection-selectedCard:', selectedCard);
  const [favorites, setFavorites] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 35.6895,
    lng: 139.6917,
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  // 태그 추가 관련 상태
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');

  // DB에 저장된 favorites (selectedCard.places)에 태그 배열, likeCount, liked 등이 포함되어 있다고 가정
  useEffect(() => {
    if (selectedCard && Array.isArray(selectedCard.places)) {
      setFavorites(selectedCard.places);
    }
  }, [selectedCard]);

  useEffect(() => {
    if (!selectedCard || !selectedCard.arrivalCity?.name) return;
    const city = selectedCard.arrivalCity.name;
    const getCoordinates = async () => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error('🚨 Geocoding 요청 실패:', error);
      }
    };
    getCoordinates();
  }, [selectedCard, apiKey]);

  const fetchPlaceDetails = async (placeId) => {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,photos,formatted_address&key=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.status === 'OK') {
        return data.result;
      } else {
        console.error('Place Details API error:', data.status);
      }
    } catch (error) {
      console.error('🚨 Places API 요청 실패:', error);
    }
    return null;
  };

  const handleMarkerClick = async (marker) => {
    setSelectedMarker({
      ...marker,
      likeYn: marker.likeYn, // ✅ 기존 좋아요 상태 유지
    });
  };

  const handleLikePlace = async (place) => {
    if (!place || !selectedCard || !selectedCard.travelPlanId) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }

    const travelPlanId = selectedCard.travelPlanId;
    const placeId = place.placeId;
    const isLiked = place.likeYn;
    const totalMember = selectedCard.member.totalParticipants;

    try {
      let updatedFavorites;
      let updatedMarker;

      if (isLiked) {
        await publicRequest.delete(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );
        updatedFavorites = favorites.map((fav) =>
          fav.placeId === placeId
            ? { ...fav, likeYn: false, likeCount: fav.likeCount - totalMember }
            : fav,
        );
        updatedMarker = {
          ...place,
          likeYn: false, // ✅ 좋아요 취소 반영
          likeCount: place.likeCount - totalMember,
        };
      } else {
        await publicRequest.post(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );
        updatedFavorites = favorites.map((fav) =>
          fav.placeId === placeId
            ? { ...fav, likeYn: true, likeCount: fav.likeCount + totalMember }
            : fav,
        );
        updatedMarker = {
          ...place,
          likeYn: true, // ✅ 좋아요 반영
          likeCount: place.likeCount + totalMember,
        };
      }

      setFavorites(updatedFavorites);
      setSelectedMarker(updatedMarker); // ✅ 마커 업데이트하여 리렌더링
    } catch (error) {
      console.error('🚨 좋아요 처리 실패:', error);
      Swal.fire('알림', '🚨 좋아요 처리 중 오류가 발생했습니다.', 'error');
    }
  };
  // InfoWindow 내 태그 추가 핸들러
  const handleTagSubmit = async () => {
    if (newTag.trim() === '') return;
    const travelPlanId = selectedCard.travelPlanId;
    const placeId = selectedMarker.placeId;
    try {
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/tags`,
        { placeTagName: newTag.trim() },
      );
      if (response.status === 200) {
        // assume response.data returns the new tag's id as response.data.id
        const newTagObj = { placeTagId: response.data.id, name: newTag.trim() };
        setSelectedMarker((prev) => ({
          ...prev,
          tags: [...(prev.tags || []), newTagObj],
        }));
        // Optionally update favorites as well if needed.
        setShowTagInput(false);
        setNewTag('');
      }
    } catch (error) {
      console.error('태그 추가 실패:', error);
      Swal.fire('알림', '태그 추가에 실패했습니다.', 'error');
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* 지도 영역 */}
      <div className="w-full h-full">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={coordinates}
          zoom={12}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
          }}
        >
          {/* 즐겨찾기 마커들을 OverlayView를 이용해 커스텀 마커로 표시 */}
          {favorites.map((marker, index) => (
            <OverlayView
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div
                className="relative cursor-pointer w-14 h-14 hover:animate-shake"
                onClick={() => handleMarkerClick(marker)}
              >
                {/* 바나나 아이콘 */}
                <img src={bananaIcon} alt="marker" className="w-full h-full" />

                {/* ❤️ 좋아요 하트 아이콘 */}
                <div className="absolute text-xl transform translate-x-1/2 -translate-y-1/2 right-2 top-6">
                  {marker.likeYn ? '❤️' : '🤍'}
                </div>

                {/* 좋아요 수 */}
                <div className="absolute inset-0 flex items-center justify-center font-bold transform translate-y-1/4">
                  {marker.likeCount || 0}
                </div>
              </div>
            </OverlayView>
          ))}

          {/* 선택된 마커의 InfoWindow */}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => {
                setSelectedMarker(null);
                setShowTagInput(false);
                setNewTag('');
              }}
            >
              <div
                className="relative p-4"
                style={{ width: '300px', minHeight: '200px' }}
              >
                <h3 className="text-lg font-bold">{selectedMarker?.name}</h3>
                {selectedMarker.address && (
                  <p className="text-sm text-gray-600">
                    {selectedMarker.address}
                  </p>
                )}
                {/* 오른쪽 상단 좋아요 버튼 (하트 아이콘만 표시) */}
                <button
                  onClick={() => handleLikePlace(selectedMarker)}
                  className="absolute p-2 text-xl rounded-full top-2 right-2 focus:outline-none"
                >
                  {selectedMarker.likeYn ? '❤️' : '🤍'}
                </button>
                {/* 태그 영역 */}
                <div className="mt-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">태그:</h4>
                    <button
                      onClick={() => setShowTagInput(true)}
                      className="px-3 py-1 text-white bg-green-500 rounded hover:bg-green-600"
                    >
                      태그 추가
                    </button>
                  </div>
                  {showTagInput && (
                    <div className="flex items-center gap-2 mt-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="태그 입력 (최대 20자)"
                        maxLength={20}
                        className="px-2 py-1 border rounded"
                      />
                      <button
                        onClick={handleTagSubmit}
                        className="px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        확인
                      </button>
                    </div>
                  )}
                  {selectedMarker.tags && selectedMarker.tags.length > 0 ? (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedMarker.tags.map((tag, idx) => (
                        <span
                          key={tag.placeTagId || idx}
                          className="text-xs bg-gray-200 px-1 py-0.5 rounded"
                        >
                          {typeof tag === 'object' ? tag.name : tag}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-2 text-sm text-gray-500">
                      태그가 없습니다. 여행태그를 작성해보세요!
                    </p>
                  )}
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      {/* 채팅창 */}
      <div
        className={`absolute transition-all duration-300 ${
          isChatOpen
            ? 'top-4 right-4 w-96 h-[500px]'
            : 'bottom-4 right-4 w-12 h-12'
        }`}
      >
        {isChatOpen ? (
          <div className="relative w-full h-full bg-white rounded-lg shadow-lg">
            <Chat travelPlanId={selectedCard.travelPlanId} />
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute p-2 text-white bg-gray-800 rounded-full top-2 right-2"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              console.log('채팅 열기 클릭됨');
              setIsChatOpen(true);
            }}
            className="flex items-center justify-center w-full h-full text-white transition-all duration-300 bg-gray-800 rounded-full shadow-lg hover:scale-110"
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveSection;
