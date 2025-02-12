import React, { useState, useEffect } from 'react';
import LikeList from './LikeList';
import Map from '../../services/map/Map';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard }) => {
  const [isLikeList, setIsLikeList] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: 35.6895,
    lng: 139.6917,
  });

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
        console.error('Geocoding 요청 실패:', error);
      }
    };
    getCoordinates();
  }, [selectedCard, apiKey]);

  useEffect(() => {
    const existingScript = document.getElementById('google-maps-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
      script.id = 'google-maps-script';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        console.log('Google Maps API 로드 완료');
      };

      script.onerror = () => {
        console.error('Google Maps API 로드 실패');
      };
    }
  }, []);

  const handlePlaceSelected = (place) => {
    setFavorites((prev) => [...prev, place]);
  };

  const handleLikePlace = async (place) => {
    if (!place || !selectedCard || !selectedCard.travelPlanId) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }

    const travelPlanId = selectedCard.travelPlanId;
    const payload = {
      name: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    };

    try {
      await publicRequest.post(
        `/api/v1/travel-plans/${travelPlanId}/places`,
        payload,
      );

      setFavorites((prev) => {
        if (prev.some((fav) => fav.name === place.name)) return prev;
        return [...prev, { ...place, likes: 1 }];
      });

      console.log('✅ 장소 찜 성공:', place);
    } catch (error) {
      console.error('🚨 장소 찜 실패:', error);
      alert('🚨 장소를 찜하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="relative flex flex-col h-screen p-8 md:flex-row">
      <div className="absolute w-full max-w-xs mb-4 transform -translate-x-1/2 top-8 left-1/2">
        <div className="flex justify-center space-x-4">
          <div
            className={`flex-1 text-center py-2 font-semibold cursor-pointer ${
              isLikeList ? 'text-brown' : 'text-gray-500'
            }`}
            onClick={() => setIsLikeList(true)}
          >
            찜하기
          </div>
          <div
            className={`flex-1 text-center py-2 font-semibold cursor-pointer ${
              !isLikeList ? 'text-brown' : 'text-gray-500'
            }`}
            onClick={() => setIsLikeList(false)}
          >
            리스트
          </div>
        </div>
        <div
          className={`absolute bottom-0 left-0 w-1/2 h-1 bg-yellow transition-all duration-300 ${
            isLikeList ? 'left-0' : 'left-1/2'
          }`}
        ></div>
      </div>

      <div className="flex flex-1 mt-16">
        <div className="w-full h-full p-4 overflow-y-auto border rounded-lg shadow-md md:w-2/3">
          {isLikeList ? (
            <Map
              coordinates={coordinates}
              markers={favorites}
              onPlaceSelected={handlePlaceSelected}
            />
          ) : (
            <LikeList
              wishlists={favorites}
              selectedCard={selectedCard}
              setFavorites={setFavorites}
            />
          )}
        </div>

        <div className="w-full h-full p-4 overflow-y-auto md:w-1/3">
          <Chat travelPlanId={selectedCard.travelPlanId} />
        </div>
      </div>
    </div>
  );
};

export default InteractiveSection;
