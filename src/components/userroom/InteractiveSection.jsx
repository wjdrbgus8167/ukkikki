import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import FavoriteList from './FavoriteList';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard }) => {
  const [isLikeListOpen, setIsLikeListOpen] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 35.6895,
    lng: 139.6917,
  });
  const [scriptLoaded, setScriptLoaded] = useState(false);

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
      Swal.fire('알림', '🚨 장소를 찜하는 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div className="relative w-full h-screen">
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
          {favorites.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
            />
          ))}
        </GoogleMap>
      </div>
      <div className="absolute bottom-4 right-4">
        {isChatOpen ? (
          <div className="relative transition-all duration-300 bg-white rounded-lg shadow-lg w-96 h-96">
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
            className="flex items-center justify-center w-12 h-12 text-white transition-all duration-300 bg-gray-800 rounded-full shadow-lg hover:scale-110"
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
};

export default InteractiveSection;
