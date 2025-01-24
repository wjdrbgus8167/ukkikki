import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const center = {
  lat: 37.7749, // 지도 중심의 위도
  lng: -122.4194, // 지도 중심의 경도
};

const Map = () => {
  return (
    <div className="bg-gray-300 w-full h-full rounded-lg flex items-center justify-center">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default Map;