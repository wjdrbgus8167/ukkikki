import React, { useState } from 'react';
import { LoadScript } from '@react-google-maps/api';
import LikeList from './LikeList';
import Map from './Map';
import Chat from './Chat';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = () => {
  const [isLikeList, setIsLikeList] = useState(true);
  const wishlists = [
    {
      name: '에펠탑',
      address: 'Champ de Mars, 5 Avenue Anatole France, 75007 Paris, France',
      latitude: 48.858844,
      longitude: 2.294351,
      likes: 210,
    },
    {
      name: '루브르 박물관',
      address: 'Rue de Rivoli, 75001 Paris, France',
      latitude: 48.860611,
      longitude: 2.337644,
      likes: 12,
    },
    // 나머지 wishlists 데이터 생략
  ];

  return (
    <div className="relative p-8 bg-white flex flex-col md:flex-row h-screen">
      {/* Google Maps API는 상위 컴포넌트에서 한번만 로드 */}
      <LoadScript googleMapsApiKey={apiKey}>
        {/* 상단의 버튼 섹션 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 mb-4 w-full max-w-xs">
          <div className="flex justify-center space-x-4">
            {/* 찜하기와 리스트 버튼 */}
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
          {/* 인디케이터 바 */}
          <div
            className={`absolute bottom-0 left-0 w-1/2 h-1 bg-yellow transition-all duration-300 ${
              isLikeList ? 'left-0' : 'left-1/2'
            }`}
          ></div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="flex flex-1 mt-16">
          {/* 왼쪽: 지도 또는 리스트 */}
          <div className="w-full md:w-2/3 p-4 h-full overflow-y-auto rounded-lg shadow-md border">
            {isLikeList ? <Map /> : <LikeList wishlists={wishlists} />}
          </div>

          {/* 오른쪽: 채팅방 */}
          <div className="w-full md:w-1/3 p-4 h-full overflow-y-auto">
            <Chat />
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default InteractiveSection;
