import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map = ({ coordinates }) => {
  return (
    <div className="bg-gray-300 w-full h-full rounded-lg flex items-center justify-center">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={coordinates}
        zoom={12}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  );
};

export default Map;
