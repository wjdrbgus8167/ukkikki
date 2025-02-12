import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MapDisplay = ({ destinationCity, selectedPlaces = [] }) => {
  const [coordinates, setCoordinates] = useState({ lat: 48.8566, lng: 2.3522 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${destinationCity}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK') {
          const { lat, lng } = data.results[0].geometry.location;
          setCoordinates({ lat, lng });
        } else {
          console.error('Geocoding API 오류:', data.status);
        }
      } catch (error) {
        console.error('API 요청 실패:', error);
      }
    };

    if (destinationCity) {
      fetchCoordinates();
    }
  }, [destinationCity]);

  return (
    <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
      <div className="w-full h-full">
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
          }}
          center={coordinates}
          zoom={12}
        >
          {/* 🔥 기존 중심 마커 */}
          <Marker position={coordinates} />

          {/* 🔥 선택된 장소들을 지도에 마커로 추가 (위도, 경도가 존재하는 경우만) */}
          {selectedPlaces
            .filter((place) => place.latitude && place.longitude) // ✅ 위도, 경도가 존재하는 경우만 추가
            .map((place, index) => (
              <Marker
                key={index}
                position={{ lat: place.latitude, lng: place.longitude }}
              />
            ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapDisplay;
