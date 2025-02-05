import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import LikeList from './LikeList';
import Map from '../../services/Map/Map';
import Chat from './Chat';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ city }) => {
  const [isLikeList, setIsLikeList] = useState(true);
  // 초기 즐겨찾기 목록 (예시)
  const initialFavorites = [
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
  ];

  // 즐겨찾기 목록을 state로 관리 (검색한 장소도 여기에 추가)
  const [favorites, setFavorites] = useState(initialFavorites);

  const [coordinates, setCoordinates] = useState({
    lat: 35.6895,
    lng: 139.6917,
  }); // 기본 위치: 도쿄

  useEffect(() => {
    const getCoordinates = async () => {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${apiKey}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log('data:', data);
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

    getCoordinates();
  }, [city]);

  // Map 컴포넌트로부터 호출되어 새로운 즐겨찾기를 추가
  const handlePlaceSelected = (place) => {
    setFavorites((prev) => [...prev, place]);
  };

  return (
    <div className="relative p-8 bg-white flex flex-col md:flex-row h-screen">
      {/* LoadScript는 한 번만 로드합니다 */}
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        {/* 상단의 버튼 섹션 */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 mb-4 w-full max-w-xs">
          <div className="flex justify-center space-x-4">
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
            {isLikeList ? (
              <Map
                coordinates={coordinates}
                markers={favorites}
                onPlaceSelected={handlePlaceSelected}
              />
            ) : (
              <LikeList wishlists={favorites} />
            )}
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
