import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
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
    const placeDetails = await fetchPlaceDetails(marker.placeId);
    if (placeDetails) {
      let photoUrl = null;
      if (placeDetails.photos && placeDetails.photos.length > 0) {
        const photoReference = placeDetails.photos[0].photo_reference;
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
        console.log('photoUrl:', photoUrl);
      }
      setSelectedMarker({
        ...marker,
        name: placeDetails.name,
        address: placeDetails.formatted_address,
        // rating은 필요시 추가,
        photo: photoUrl,
        // tags, likeCount, liked: DB favorites에 저장된 값을 그대로 사용
      });
      // 초기 태그 입력창 상태 초기화
      setShowTagInput(false);
      setNewTag('');
    } else {
      setSelectedMarker(marker);
    }
  };

  const handleLikePlace = async (place) => {
    if (!place || !selectedCard || !selectedCard.travelPlanId) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }
    const travelPlanId = selectedCard.travelPlanId;
    const placeId = place.placeId;
    try {
      if (place.liked) {
        await publicRequest.delete(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );
        setFavorites((prev) =>
          prev.map((fav) =>
            fav.placeId === placeId
              ? { ...fav, liked: false, likeCount: fav.likeCount - 1 }
              : fav,
          ),
        );
        if (selectedMarker && selectedMarker.placeId === placeId) {
          setSelectedMarker((prev) => ({
            ...prev,
            liked: false,
            likeCount: prev.likeCount - 1,
          }));
        }
      } else {
        await publicRequest.post(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );
        setFavorites((prev) =>
          prev.map((fav) =>
            fav.placeId === placeId
              ? { ...fav, liked: true, likeCount: fav.likeCount + 1 }
              : fav,
          ),
        );
        if (selectedMarker && selectedMarker.placeId === placeId) {
          setSelectedMarker((prev) => ({
            ...prev,
            liked: true,
            likeCount: prev.likeCount + 1,
          }));
        }
      }
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
          {/* 즐겨찾기 마커들 */}
          {favorites.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              icon={{
                url: bananaIcon,
                scaledSize: new window.google.maps.Size(40, 40),
                labelOrigin: new window.google.maps.Point(30, 10),
              }}
              label={{
                text: `${marker.liked ? '❤️' : '🤍'}${marker.likeCount || 0}`,
                fontSize: '12px',
                fontWeight: 'bold',
                color: 'black',
              }}
              onClick={() => handleMarkerClick(marker)}
            />
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
              <div className="p-4">
                {selectedMarker.photo && (
                  <img
                    src={selectedMarker.photo}
                    alt={selectedMarker.name}
                    className="object-cover w-full h-32 mb-2 rounded-lg"
                  />
                )}
                <h3 className="text-lg font-bold">{selectedMarker.name}</h3>
                {selectedMarker.address && (
                  <p className="text-sm text-gray-600">
                    {selectedMarker.address}
                  </p>
                )}
                {/* 좋아요 버튼: 원형 버튼 안에 하트 아이콘과 좋아요 수 오버레이 */}
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleLikePlace(selectedMarker)}
                    className="relative flex items-center justify-center w-10 h-10 text-xs font-bold text-white bg-blue-500 rounded-full hover:bg-blue-600"
                  >
                    <span className="absolute inset-0 flex items-center justify-center text-2xl">
                      {selectedMarker.liked ? '❤️' : '🤍'}
                    </span>
                    <span className="relative">
                      {selectedMarker.likeCount || 0}
                    </span>
                  </button>
                </div>
                {/* 태그 영역 */}
                {selectedMarker.tags && selectedMarker.tags.length > 0 ? (
                  <div className="mt-2">
                    <h4 className="text-sm font-semibold">태그:</h4>
                    <div className="flex flex-wrap gap-1">
                      {selectedMarker.tags.map((tag, idx) => (
                        <span
                          key={tag.placeTagId || idx}
                          className="text-xs bg-gray-200 px-1 py-0.5 rounded"
                        >
                          {typeof tag === 'object' ? tag.name : tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-gray-500">
                    태그가 없습니다. 여행태그를 작성해보세요!
                  </p>
                )}
                {/* 태그 추가 UI */}
                <div className="mt-2">
                  {showTagInput ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) =>
                          e.stopPropagation() || setNewTag(e.target.value)
                        }
                        placeholder="태그 입력 (최대 20자)"
                        maxLength={20}
                        className="px-2 py-1 border rounded"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTagSubmit();
                        }}
                        className="px-3 py-1 text-white bg-blue-500 rounded"
                      >
                        확인
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTagInput(true);
                      }}
                      className="px-3 py-1 text-white bg-green-500 rounded"
                    >
                      +
                    </button>
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
