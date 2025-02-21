import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';
import bananaIcon from '../../assets/loading-spinner.png'; // 바나나 아이콘 이미지

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

const Map = ({ coordinates, markers }) => {
  const [bananaIconObject, setBananaIconObject] = useState(null);

  // Google API가 로드된 후 아이콘 설정
  useEffect(() => {
    if (typeof window.google !== 'undefined') {
      setBananaIconObject({
        url: bananaIcon,
        scaledSize: new window.google.maps.Size(30, 30), // 크기 조정
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(15, 15),
      });
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
        options={mapOptions}
      >
        {/* 도시 중심 마커 */}
        {bananaIconObject && (
          <Marker position={coordinates} icon={bananaIconObject} />
        )}

        {/* 찜한 장소 마커들 */}
        {bananaIconObject &&
          markers.map((marker, index) => (
            <Marker
              key={index}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              icon={bananaIconObject}
            />
          ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
