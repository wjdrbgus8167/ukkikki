import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import LikeList from './LikeList';
import Map from './Map';
import Chat from './Chat';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = () => {
  const [isLikeList, setIsLikeList] = useState(true);
  
  return (
    <div className="relative p-8 bg-white flex flex-col md:flex-row h-screen">
      {/* Google Maps API는 상위 컴포넌트에서 한번만 로드 */}
      <LoadScript googleMapsApiKey={apiKey}>
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 mb-4 w-full max-w-xs">
          <div className="flex justify-center space-x-4">
            {/* 찜하기와 리스트 버튼 */}
            <div
              className={`flex-1 text-center py-2 font-semibold cursor-pointer ${
                isLikeList ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLikeList(true)}
            >
              찜하기
            </div>
            <div
              className={`flex-1 text-center py-2 font-semibold cursor-pointer ${
                !isLikeList ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => setIsLikeList(false)}
            >
              리스트
            </div>
          </div>
          {/* 인디케이터 바 */}
          <div
            className={`absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 transition-all duration-300 ${
              isLikeList ? 'left-0' : 'left-1/2'
            }`}
          ></div>
        </div>

        {/* 왼쪽 컨텐츠: 지도 또는 리스트 */}
        <div className="w-full md:w-2/3 p-4 mt-16 h-full overflow-y-auto">
          {isLikeList ? <Map /> : <LikeList />}
        </div>

        {/* 오른쪽 컨텐츠: 채팅방 */}
        <div className="w-full md:w-1/3 p-4 mt-16 h-full border-l overflow-y-auto">
          <Chat />
        </div>
      </LoadScript>
    </div>
  );
};

export default InteractiveSection;