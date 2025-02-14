// src/services/MapSearchBar.jsx
import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';

const MapSearchBar = ({ onPlaceSelected }) => {
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false); // ★ 찜 토글 상태

  const autocompleteRef = useRef(null);

  // Autocomplete가 장소를 선택했을 때
  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    // place 혹은 geometry가 없으면 중단 (Enter만 치는 케이스 등)
    if (!place || !place.geometry) {
      console.warn('유효한 장소가 선택되지 않았습니다.');
      return;
    }

    // 사진 URL 추출
    const photoUrl =
      place.photos && place.photos.length > 0
        ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
        : null;

    // 별점(rating) 추출 (없을 수도 있음)
    const rating = place.rating || null;

    const newPlace = {
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      photoUrl,
      rating,
    };
    setSearchedPlace(newPlace);
    setIsBookmarked(false); // 새 검색 시 찜상태 초기화
  };

  // "찜하기"/"찜 취소" 버튼
  const handleToggleBookmark = () => {
    if (!searchedPlace) return;

    if (!isBookmarked) {
      onPlaceSelected(searchedPlace); // onPlaceSelected를 호출하도록 수정
      setIsBookmarked(true);
    } else {
      // "찜 취소" 시 로직 추가 (필요한 경우)
      setIsBookmarked(false);
    }
  };

  return (
    <div>
      {/* Autocomplete 검색창 */}
      <Autocomplete
        onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
        onPlaceChanged={onPlaceChanged}
      >
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder=""
            className="
              w-full h-[44px] pl-4 pr-[48px]
              text-sm  border border-gray-300
              focus:outline-none
            "
          />
          {/* 오른쪽 끝에 돋보기 아이콘 */}
          <div className="absolute text-xl text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <FaSearch />
          </div>
        </div>
      </Autocomplete>

      {/* 장소가 선택되면 아래에 정보 & 찜 버튼 표시 */}
      {searchedPlace && (
        <div
          className="
            mt-2
            flex
            flex-col
            border
            border-gray-300
            rounded-md
            p-2
            bg-white
            w-[320px]
          "
        >
          {/* 상단부 (사진 + 기본정보) */}
          <div className="flex items-center">
            {/* 왼쪽 사진(있으면) */}
            {searchedPlace.photoUrl && (
              <img
                src={searchedPlace.photoUrl}
                alt="Place"
                className="w-[60px] h-[60px] rounded object-cover mr-2"
              />
            )}

            {/* 이름 + 주소 */}
            <div className="flex-1">
              <div className="font-bold">{searchedPlace.name}</div>
              <div className="text-sm text-gray-600">
                {searchedPlace.address}
              </div>
            </div>
          </div>

          {/* 별점 표시 (있으면) */}
          {searchedPlace.rating !== null && (
            <div className="mt-2 text-sm text-gray-700">
              별점: {searchedPlace.rating}
            </div>
          )}

          {/* "찜하기" / "찜 취소" 버튼 */}
          <button
            onClick={handleToggleBookmark}
            className="self-end px-3 mt-2 text-white bg-orange-400 border-none rounded cursor-pointer h-9"
          >
            {isBookmarked ? '찜 취소' : '찜하기'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MapSearchBar;
