import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MapDisplay = ({ arrivalCity, selectedPlaces = [], day }) => {
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchCoordinates = async () => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${arrivalCity}&key=${apiKey}`;
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

    if (arrivalCity) {
      fetchCoordinates();
    }
  }, [arrivalCity]);

  const getCustomMarkerIcon = (day, order) => {
    const text = `${day}-${order}`;
    const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <circle cx="20" cy="20" r="16" fill="#FFD21C" stroke="white" stroke-width="2" />
      <text x="20" y="24" text-anchor="middle" font-size="14" fill="black" font-family="Arial" font-weight="bold">
        ${text}
      </text>
    </svg>
  `;
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new window.google.maps.Size(50, 50)
    };
  };

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
                icon={getCustomMarkerIcon(day, index + 1)}/>
            ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default MapDisplay;
