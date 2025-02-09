import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import LikeList from './LikeList';
import Map from '../../services/map/Map';
import Chat from './Chat';
import { publicRequest } from '../../hooks/requestMethod';

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const InteractiveSection = ({ selectedCard }) => {
  const travelPlanId = selectedCard.id; // 여행방 ID
  const city = selectedCard.country || '기본 도시'; // 선택된 도시

  const [isLikeList, setIsLikeList] = useState(true);

  // 즐겨찾기 목록을 state로 관리 (검색한 장소도 여기에 추가)
  const [favorites, setFavorites] = useState([]);

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

  //장소에 찜하기 누를 때 호출되는 함수
  const handleLikePlace = async (place) => {
    if (!place || !selectedCard || !selectedCard.id) {
      console.error('🚨 장소 정보 또는 여행방 ID가 없습니다.');
      return;
    }

    const travelPlanId = selectedCard.id; // 선택된 여행방 ID
    const placeId = place.id; // 장소 ID (API 응답에서 받아옴)

    try {
      await publicRequest.post(`/travel-plans/${travelPlanId}/places`);

      // ✅ 찜한 장소를 `favorites` 목록에 추가
      setFavorites((prev) => {
        // 중복 체크 (같은 장소를 여러 번 찜하지 않도록)
        if (prev.some((fav) => fav.id === placeId)) return prev;
        return [...prev, { ...place, likes: 1 }]; // 기본 좋아요 1로 설정
      });

      console.log('✅ 장소 찜 성공:', place);
    } catch (error) {
      console.error('🚨 장소 찜 실패:', error);
      alert('🚨 장소를 찜하는 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="relative flex flex-col h-screen p-8 bg-white md:flex-row">
      {/* LoadScript는 한 번만 로드합니다 */}
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        {/* 상단의 버튼 섹션 */}
        <div className="absolute w-full max-w-xs mb-4 transform -translate-x-1/2 top-8 left-1/2">
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
          <div className="w-full h-full p-4 overflow-y-auto border rounded-lg shadow-md md:w-2/3">
            {isLikeList ? (
              <Map
                coordinates={coordinates}
                markers={favorites}
                onPlaceSelected={handleLikePlace}
              />
            ) : (
              <LikeList wishlists={favorites} />
            )}
          </div>

          {/* 오른쪽: 채팅방 */}
          <div className="w-full h-full p-4 overflow-y-auto md:w-1/3">
            <Chat />
          </div>
        </div>
      </LoadScript>
    </div>
  );
};

export default InteractiveSection;
