// src/services/Map.jsx
import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, Autocomplete } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map = ({ coordinates, markers, onPlaceSelected }) => {
  // 검색한 장소를 임시로 저장할 state
  const [searchedPlace, setSearchedPlace] = useState(null);
  const autocompleteRef = useRef(null);

  // Autocomplete가 선택되었을 때 호출
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newPlace = {
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        };
        setSearchedPlace(newPlace);
      }
    } else {
      console.log('Autocomplete가 아직 로드되지 않았습니다.');
    }
  };

  // “찜하기” 버튼 클릭 시 부모에게 새로운 장소를 전달
  const handleAddPlace = () => {
    if (searchedPlace) {
      onPlaceSelected(searchedPlace);
      setSearchedPlace(null);
    }
  };

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
      >
        {/* 도시 중심 마커 */}
        <Marker position={coordinates} />
        {/* 즐겨찾기로 추가된 마커들 */}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
          />
        ))}
      </GoogleMap>
      {/* 지도 위에 오버레이 된 검색바와 찜하기 버튼 */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Autocomplete
          onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            type="text"
            placeholder="장소 검색"
            style={{
              width: '240px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              border: '1px solid #ccc',
            }}
          />
        </Autocomplete>
        {/* 검색 후 장소가 선택되면 찜하기 버튼 보임 */}
        {searchedPlace && (
          <button
            onClick={handleAddPlace}
            style={{
              marginLeft: '10px',
              height: '32px',
              padding: '0 12px',
              borderRadius: '3px',
              border: 'none',
              backgroundColor: '#f0ad4e',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            찜하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Map;
