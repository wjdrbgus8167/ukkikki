import React, { useEffect, useState } from 'react';
import { GoogleMap, InfoWindow, OverlayView } from '@react-google-maps/api';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import bananaIcon from '../../assets/loading-spinner.png';
import WebSocketComponent, { stompClient } from '../../components/userroom/WebSocketComponent';
import { RiChatSmileAiLine } from 'react-icons/ri';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard, favorites, setFavorites }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 35.6895, lng: 139.6917 });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [showTagInput, setShowTagInput] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [renderKey, setRenderKey] = useState(0); // GoogleMap 강제 리렌더링용

  // 태그 제출 핸들러 (필요에 따라 실제 로직 구현)
  const handleTagSubmit = () => {
    console.log('새 태그:', newTag);
    setShowTagInput(false);
    setNewTag('');
  };

  // ✅ WebSocket을 활용한 실시간 마커 업데이트
  useEffect(() => {
    console.log('✅ favorites 상태 변경됨:', favorites);
    setRenderKey((prev) => prev + 1); // Google Map 강제 리렌더링
  }, [favorites]);

  // ✅ 도시 좌표 가져오기 (Google Geocoding API)
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
  }, [selectedCard]);

  // ✅ 마커 클릭 시 상태 업데이트
  const handleMarkerClick = (marker) => {
    setSelectedMarker({ ...marker });
  };

  const handleLikePlace = async (place) => {
    if (!place || !selectedCard || !selectedCard.travelPlanId) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }

    const travelPlanId = selectedCard.travelPlanId;
    const placeId = place.placeId;
    const isLiked = place.likeYn; // 기존 좋아요 상태
    const totalMember = selectedCard?.member?.totalParticipants || 0;
    const placeName = place.name;
    let actionType;

    try {
      let updatedMarker;

      if (isLiked) {
        console.log("좋아요 삭제");
        await publicRequest.delete(`/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`);
        updatedMarker = {
          ...place,
          likeYn: false,
          isLiked: false,
          likeCount: Math.max(place.likeCount - totalMember, 0),
        };
        actionType = "UNLIKE"
      } else {
        console.log("좋아요 추가");
        await publicRequest.post(`/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`);
        updatedMarker = {
          ...place,
          likeYn: true,
          isLiked: true,
          likeCount: place.likeCount + totalMember,
        };
        actionType = 'LIKE';
      }

      // ✅ 상태 업데이트 - 새로운 배열을 반환하여 리렌더링 유도
      setFavorites((prev) => {
        const newFavorites = prev.map((fav) =>
          fav.placeId === placeId ? { ...updatedMarker } : fav,
        );
        return [...newFavorites]; // 새로운 배열을 반환해 참조 변경
      });

      // ✅ 현재 선택된 마커도 업데이트 (UI 즉시 반영)
      setSelectedMarker((prev) =>
        prev && prev.placeId === placeId ? { ...updatedMarker } : prev,
      );

      // ✅ WebSocket을 통해 실시간으로 마커 상태 변경 전송
      if (stompClient && stompClient.connected) {
        const wsData = {
          action: actionType, // ✅ Action Enum 값 전송
          placeName,
          travelPlanId
        };
        stompClient.publish({
          destination: '/pub/actions',
          body: JSON.stringify(wsData),
        });
        console.log('✅ InteractiveSection 좋아요 이벤트:', wsData);
      }
    } catch (error) {
      console.error('🚨 좋아요 처리 실패:', error);
      Swal.fire('알림', '🚨 좋아요 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* ✅ 웹소켓 구독을 위한 WebSocketComponent 추가 */}
      <WebSocketComponent travelPlanId={selectedCard.travelPlanId} setFavorites={setFavorites} favorites={favorites} />

      {/* 지도 영역 */}
      <div className="w-full h-full">
        <GoogleMap
          key={renderKey}
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
                <img src={bananaIcon} alt="marker" className="w-full h-full" />
                <div className="absolute text-xl transform translate-x-1/2 -translate-y-1/2 right-2 top-6">
                  {marker.likeYn ? '❤️' : '🤍'}
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-bold transform translate-y-1/4">
                  {marker.likeCount || 0}
                </div>
              </div>
            </OverlayView>
          ))}

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

      <div className="fixed bottom-4 right-4 z-[9999]">
        {isChatOpen ? (
          <div className="relative w-96 h-[500px] rounded-lg bg-white shadow-lg">
            <Chat travelPlanId={selectedCard.travelPlanId} />
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-2 right-2 p-2 text-white bg-gray-800 rounded-full"
            >
              ✕
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsChatOpen(true)}
            className="flex items-center justify-center w-12 h-12 text-white bg-gray-800 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <RiChatSmileAiLine size={24} />
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveSection;
