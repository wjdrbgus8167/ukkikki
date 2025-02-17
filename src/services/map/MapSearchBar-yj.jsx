// MapSearchBar.jsx
import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';

const MapSearchBar = ({ onPlaceSelected, selectedTravelPlanId, favorites }) => {
  const [searchedPlace, setSearchedPlace] = useState(null);
  // isRegistered: 장소가 등록되었는지 여부
  const [isRegistered, setIsRegistered] = useState(false);
  const autocompleteRef = useRef(null);

  // Autocomplete가 로드되었을 때 ref 설정
  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Autocomplete에서 장소 선택 시 처리
  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    const place = autocompleteRef.current.getPlace();
    // place 혹은 geometry가 없으면 중단
    if (!place || !place.geometry) {
      console.warn('유효한 장소가 선택되지 않았습니다.');
      return;
    }
    console.log('선택된 place:', place);

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
      // 우선 구글의 placeId 사용 (등록 후 DB에서 새 ID로 업데이트됨)
      placeId: place.place_id || Date.now().toString(),
    };
    console.log('새 장소 정보:', newPlace);

    // 중복 등록 방지: 이미 favorites에 동일한 이름의 장소가 있다면
    const isDuplicate = favorites.some((fav) => fav.name === newPlace.name);
    if (isDuplicate) {
      Swal.fire('알림', '이미 등록된 장소입니다.', 'info');
      setIsRegistered(true);
      setSearchedPlace(newPlace);
      return;
    }

    setSearchedPlace(newPlace);
    setIsRegistered(false);
  };

  // "장소 등록" 버튼 클릭 시 처리
  const handleToggleBookmark = async () => {
    if (!searchedPlace) return;
    // 만약 이미 등록된 상태라면 등록 완료로 처리하고 더 이상 호출하지 않음
    if (isRegistered) {
      Swal.fire('알림', '이미 등록된 장소입니다.', 'info');
      return;
    }
    try {
      if (!isRegistered) {
        const message = {
          ...searchedPlace,
          travelPlanId: selectedTravelPlanId,
        };
        console.log(message); // travelPlanId가 추가된 객체 확인

        if (stompClient && stompClient.connected) {
          stompClient.publish({
            destination: '/pub/likes',
            body: JSON.stringify(message),
          });
          console.log('✅ 웹소켓 이벤트 발행됨:', message);
        } else {
          console.warn('⚠️ 웹소켓 연결이 끊어져 있어 이벤트를 발행하지 못함.');
        }
        const response = await publicRequest.post(
          `/api/v1/travel-plans/${selectedTravelPlanId}/places`,
          searchedPlace,
        );
        if (response.status === 200) {
          // 응답에서 DB의 고유 ID 추출 (예: response.data.data.placeId)
          const dbPlaceId = response.data.data.placeId;
          console.log('DB 응답, 새 장소 ID:', dbPlaceId);
          // 구글의 placeId 대신 DB에서 생성된 ID로 업데이트
          const updatedPlace = { ...searchedPlace, placeId: dbPlaceId };
          // 부모 콜백 호출해 favorites 상태 업데이트
          onPlaceSelected(updatedPlace);
          setIsRegistered(true);
          Swal.fire('성공', '장소가 등록되었습니다.', 'success');
          console.log('등록된 장소:', updatedPlace);
        } else {
          setIsRegistered(false);
        }

        // DB 저장 (API 호출)
      }
    } catch (error) {
      console.error('새 장소 등록 실패:', error);
      Swal.fire('알림', '🚨 장소 등록 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <div>
      <Autocomplete onLoad={handleLoad} onPlaceChanged={onPlaceChanged}>
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="장소 검색"
            className="w-full h-[44px] pl-4 pr-[48px] text-sm border border-gray-300 focus:outline-none"
          />
          <div className="absolute text-xl text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2">
            <FaSearch />
          </div>
        </div>
      </Autocomplete>

      {/* 장소가 선택되면 정보 및 등록 버튼 표시 */}
      {searchedPlace && (
        <div className="mt-2 flex flex-col border border-gray-300 rounded-md p-2 bg-white w-[320px]">
          <div className="flex items-center">
            {searchedPlace.photoUrl && (
              <img
                src={searchedPlace.photoUrl}
                alt="Place"
                className="w-[60px] h-[60px] rounded object-cover mr-2"
              />
            )}
            <div className="flex-1">
              <div className="font-bold">{searchedPlace.name}</div>
              <div className="text-sm text-gray-600">
                {searchedPlace.address}
              </div>
            </div>
          </div>
          {searchedPlace.rating !== null && (
            <div className="mt-2 text-sm text-gray-700">
              별점: {searchedPlace.rating}
            </div>
          )}
          <button
            onClick={handleToggleBookmark}
            className="self-end px-3 mt-2 text-white bg-orange-400 rounded cursor-pointer h-9"
            disabled={isRegistered}
          >
            {isRegistered ? '등록 완료' : '장소 등록'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MapSearchBar;
