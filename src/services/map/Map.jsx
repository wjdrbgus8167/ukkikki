// src/services/Map.jsx
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import MapSearchBar from './MapSearchBar';
import bananaIcon from '../../assets/loading-spinner.png'; // 예시

const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapOptions = {
  mapTypeControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false,
};

const Map = ({ coordinates, markers, onPlaceSelected }) => {
  // 마커 아이콘 옵션 (크기 30×30)
  const bananaIconObject = {
    url: bananaIcon,
    scaledSize: new window.google.maps.Size(30, 30),
    origin: new window.google.maps.Point(0, 0),
    anchor: new window.google.maps.Point(15, 15),
  };

  // 이미 LoadScript로 스크립트가 로드되었으므로 useLoadScript 제거
  // 대신 API가 로드되어 있다고 가정하고 GoogleMap을 바로 렌더링합니다.

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
        options={mapOptions}
      >
        {/* 도시 중심 마커 */}
        <Marker position={coordinates} icon={bananaIconObject} />

        {/* 즐겨찾기 마커들 */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            icon={bananaIconObject}
          />
        ))}
      </GoogleMap>

      {/* 검색바 위치: absolute */}
      <div className="absolute z-10 top-2 left-2">
        <MapSearchBar onPlaceSelected={onPlaceSelected} />
      </div>
    </div>
  );
};

export default Map;
