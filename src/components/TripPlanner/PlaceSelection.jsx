import React, { useState, useRef } from 'react';
import { Autocomplete } from '@react-google-maps/api';

const PlaceSelection = ({
  destinationCity,
  travelStart,
  travelEnd,
  placeList,
  onTogglePlace = () => {}, // ✅ 기본값 추가 (undefined 방지)
  selectedPlaces = [], // ✅ 현재 선택된 날짜의 장소 목록
}) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const autocompleteRef = useRef(null);
  const [searchedPlace, setSearchedPlace] = useState(null);

  // 좋아요 순 정렬
  const sortedPlaceList = [...placeList].sort((a, b) => b.likes - a.likes);

  // Autocomplete에서 장소가 선택되었을 때 실행
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        const newPlace = {
          id: Date.now(), // 고유 ID 생성
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          likes: 0, // 검색한 장소는 좋아요 없음
        };
        setSearchedPlace(newPlace);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{destinationCity}</h1>
      <h3 className="text-lg mb-4">
        {travelStart} ~ {travelEnd}
      </h3>

      {/* 🔥 탭 스위치 버튼 */}
      <div className="flex mb-4">
        <button
          onClick={() => setIsSearchMode(false)}
          className={`flex-1 py-2 font-semibold ${
            !isSearchMode
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500'
          }`}
        >
          여행 장소 목록
        </button>
        <button
          onClick={() => setIsSearchMode(true)}
          className={`flex-1 py-2 font-semibold ${
            isSearchMode
              ? 'text-blue-500 border-b-2 border-blue-500'
              : 'text-gray-500'
          }`}
        >
          새로운 장소 검색
        </button>
      </div>

      {/* 🔥 "여행 장소 목록" 탭 */}
      {!isSearchMode && (
        <>
          <h2 className="text-xl font-bold mb-4">여행 장소 목록</h2>
          <ul>
            {sortedPlaceList.map((place) => {
              const isSelected = selectedPlaces.some((p) => p.id === place.id); // ✅ 선택된 장소인지 확인
              return (
                <li
                  key={place.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div>
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-sm text-gray-600">{place.address}</p>
                    <p className="text-sm text-gray-600">
                      좋아요: {place.likes}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      console.log('onTogglePlace 실행됨:', onTogglePlace); // ✅ 디버깅
                      onTogglePlace(place);
                    }}
                    className={`px-2 py-1 text-white rounded transition-colors ${
                      isSelected
                        ? 'bg-gray-400 cursor-pointer'
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                  >
                    {isSelected ? '✔' : '+'}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* 🔥 "새로운 장소 검색" 탭 */}
      {isSearchMode && (
        <>
          <h2 className="text-xl font-bold mb-4">장소 검색</h2>
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="장소 검색"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </Autocomplete>

          {/* 🔥 검색한 장소 표시 */}
          {searchedPlace && (
            <div className="mt-4 p-3 border rounded-lg shadow">
              <p className="font-semibold">{searchedPlace.name}</p>
              <p className="text-sm text-gray-600">{searchedPlace.address}</p>
              <button
                onClick={() => onTogglePlace(searchedPlace)}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                선택하여 추가
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlaceSelection;
