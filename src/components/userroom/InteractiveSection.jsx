import React, { useState, useEffect } from 'react';
import {
  LoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import FavoriteList from './FavoriteList';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import bananaIcon from '../../assets/loading-spinner.png'; // 바나나 아이콘 이미지

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard }) => {
  console.log('InteractiveSection-selectedCard:', selectedCard);
  const [isLikeListOpen, setIsLikeListOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 35.6895,
    lng: 139.6917,
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null); // 선택된 마커 정보

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
      // photos 배열이 존재하고, 최소 하나 이상의 사진 정보가 있는 경우
      if (placeDetails.photos && placeDetails.photos.length > 0) {
        const photoReference = placeDetails.photos[0].photo_reference;
        // Google Place Photo API를 이용해 URL 생성 (maxwidth는 원하는 크기에 맞게 조정)
        photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;
      }

      setSelectedMarker({
        ...marker,
        name: placeDetails.name,
        address: placeDetails.formatted_address,
        rating: placeDetails.rating,
        photo: photoUrl,
      });
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
              ? { ...fav, liked: false, likes: fav.likes - 1 }
              : fav,
          ),
        );
      } else {
        await publicRequest.post(
          `/api/v1/travel-plans/${travelPlanId}/places/${placeId}/likes`,
        );
        setFavorites((prev) =>
          prev.map((fav) =>
            fav.placeId === placeId
              ? { ...fav, liked: true, likes: fav.likes + 1 }
              : fav,
          ),
        );
      }
    } catch (error) {
      console.error('🚨 좋아요 처리 실패:', error);
      Swal.fire('알림', '🚨 좋아요 처리 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="relative w-full h-screen">
      {/* LoadScript로 Google Maps API 스크립트 로드 */}

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
          {/* 도시 중심 마커 */}
          {/* <Marker
            position={coordinates}
            icon={{
              url: bananaIcon, // 바나나 아이콘으로 교체
              scaledSize: new window.google.maps.Size(40, 40), // 아이콘 크기 조정
            }}
          /> */}

          {/* 즐겨찾기 마커들 */}
          {favorites.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              icon={{
                url: bananaIcon, // 바나나 아이콘으로 교체
                scaledSize: new window.google.maps.Size(40, 40), // 아이콘 크기 조정
              }}
              onClick={() => handleMarkerClick(marker)} // 마커 클릭 시 정보 창 띄우기
            />
          ))}

          {/* 선택된 마커의 정보 창 */}
          {selectedMarker && (
            <InfoWindow
              position={{
                lat: selectedMarker.latitude,
                lng: selectedMarker.longitude,
              }}
              onCloseClick={() => setSelectedMarker(null)} // 창 닫기
            >
              <div className="p-4">
                {/* 장소 사진 */}
                {selectedMarker.photo && (
                  <img
                    src={selectedMarker.photo}
                    alt={selectedMarker.name}
                    className="object-cover w-full h-32 mb-2 rounded-lg"
                  />
                )}
                {/* 장소 이름 */}
                <h3 className="text-lg font-bold">{selectedMarker.name}</h3>
                {/* 주소 */}
                <p className="text-sm text-gray-600">
                  {selectedMarker.address}
                </p>
                {/* 구글 별점 */}
                <p className="text-sm text-gray-600">
                  ⭐ {selectedMarker.rating || 'N/A'}
                </p>
                {/* 좋아요 수 및 버튼 */}
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm text-gray-600">
                    좋아요 수: {selectedMarker.likes || 0}
                  </p>
                  <button
                    onClick={() => handleLikePlace(selectedMarker)}
                    className={`px-4 py-2 text-sm text-white rounded-lg ${
                      selectedMarker.liked ? 'bg-red-500' : 'bg-blue-500'
                    } hover:bg-blue-600`}
                  >
                    {selectedMarker.liked ? '좋아요 취소' : '좋아요'}
                  </button>
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
            ? 'top-4 right-4 w-96 h-[500px]' // 열렸을 때 위치 및 크기
            : 'bottom-4 right-4 w-12 h-12' // 접혔을 때 위치 및 크기
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
            onClick={() => setIsChatOpen(true)}
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
