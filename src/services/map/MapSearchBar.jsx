import React, { useRef, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FaSearch } from 'react-icons/fa';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import { stompClient } from '../../components/userroom/WebSocketComponent';

const MapSearchBar = ({
  onPlaceSelected,
  selectedTravelPlanId,
  favorites = [],
  onLocationChange,
}) => {
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const autocompleteRef = useRef(null);

  // Autocomplete 로드 시 ref 설정
  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // Autocomplete에서 장소 선택 시 처리
  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) {
      console.warn('유효한 장소가 선택되지 않았습니다.');
      return;
    }
    console.log('선택된 place:', place);
    const photoUrl =
      place.photos && place.photos.length > 0
        ? place.photos[0].getUrl({ maxWidth: 100, maxHeight: 100 })
        : null;
    const rating = place.rating || null;
    const newPlace = {
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      photoUrl,
      rating,
      // 우선 구글의 placeId를 사용 (등록 후 DB에서 새 ID로 업데이트됨)
      placeId: place.place_id || Date.now().toString(),
    };
    console.log('새 장소 정보:', newPlace);

    // 중복 등록 방지: favorites에 이미 같은 장소가 있는지 확인 (placeId 또는 name 기준)
    const isDuplicate = favorites.some(
      (fav) => fav.placeId === newPlace.placeId || fav.name === newPlace.name,
    );
    if (isDuplicate) {
      Swal.fire('알림', '이미 등록된 장소입니다.', 'info');
      setIsRegistered(true);
      setSearchedPlace(newPlace);
      return;
    }
    setSearchedPlace(newPlace);
    setIsRegistered(false);
    if (onLocationChange) {
      onLocationChange(newPlace);
    }
  };

  // "장소 등록" 버튼 클릭 시 처리
  const handleToggleBookmark = async () => {
    if (!searchedPlace) return;
    if (isRegistered) {
      Swal.fire('알림', '이미 등록된 장소입니다.', 'info');
      return;
    }

    const place = autocompleteRef.current.getPlace();
    const placeName = place.name;

    try {
      // DB 저장 (API 호출)
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${selectedTravelPlanId}/places`,
        searchedPlace,
      );
      if (response.status === 200) {
        // 응답에서 DB의 고유 ID를 받아옴 (예: response.data.data.placeId)
        const dbPlaceId = response.data.data.placeId;
        console.log('DB 응답, 새 장소 ID:', dbPlaceId);
        // 구글의 placeId 대신 DB에서 생성된 ID로 업데이트
        const updatedPlace = { ...searchedPlace, placeId: dbPlaceId };
        // 부모의 onPlaceSelected를 통해 favorites 상태 업데이트
        // 📌 중복 체크 후 추가 (favorites에 존재하는지 확인)
        if (
          !favorites.some(
            (fav) =>
              fav.placeId === updatedPlace.placeId ||
              (fav.latitude === updatedPlace.latitude &&
                fav.longitude === updatedPlace.longitude),
          )
        ) {
          onPlaceSelected(updatedPlace);
        }

        setSearchedPlace(updatedPlace);
        setIsRegistered(true);

        const message = {
          ...searchedPlace,
          travelPlanId: selectedTravelPlanId,
        };

        if (stompClient && stompClient.connected) {
          const wsData = {
            action: 'ADD_PLACE', // ✅ Action Enum 값 전송
            placeName,
            travelPlanId: selectedTravelPlanId,
          };
          stompClient.publish({
            destination: '/pub/actions',
            body: JSON.stringify(wsData),
          });
          console.log('✅ MapSearchBar 장소 등록 이벤트 발행:', wsData);
        } else {
          console.warn('⚠️ 웹소켓 연결이 끊어져 있어 이벤트를 발행하지 못함.');
        }

        Swal.fire('성공', '장소가 등록되었습니다.', 'success');
        console.log('등록된 장소:', updatedPlace);
      }
    } catch (error) {
      console.error('새 장소 등록 실패:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message &&
        error.response.data.error.message.includes(
          '이미 여행 계획에 등록된 여행지',
        )
      ) {
        Swal.fire('알림', '이미 등록된 장소입니다.', 'info');
        setIsRegistered(true);
      } else {
        Swal.fire('알림', '🚨 장소 등록 중 오류가 발생했습니다.', 'error');
      }
    }
  };

  return (
    <div>
      <Autocomplete onLoad={handleLoad} onPlaceChanged={onPlaceChanged}>
        <div className="relative w-[320px]">
          <input
            type="text"
            placeholder="장소 검색"
            className="w-full h-12 pl-4 pr-12 text-base bg-transparent rounded-full focus:outline-none"
          />
          <div className="absolute inset-y-0 flex items-center text-xl text-gray-400 pointer-events-none right-4">
            <FaSearch />
          </div>
        </div>
      </Autocomplete>

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
