import React, { useRef, useState, useEffect } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import { FaSearch, FaTimes } from 'react-icons/fa';
import Slider from 'react-slick';
import { publicRequest } from '../../hooks/requestMethod';
import Swal from 'sweetalert2';
import { stompClient } from '../../components/userroom/WebSocketComponent';
import { Element } from 'react-scroll';

// 커스텀 슬라이더 화살표 (투명한 원형 버튼)
const CustomNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        right: '10px',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

const CustomPrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        left: '10px',
        zIndex: 2,
      }}
      onClick={onClick}
    />
  );
};

const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 300, // 300ms 전환 (더 빠름)
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />,
};

const MapSearchBar = ({
  onPlaceSelected,
  selectedTravelPlanId,
  favorites = [],
  onLocationChange,
}) => {
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const autocompleteRef = useRef(null);

  // Autocomplete 로드 시 ref 설정
  const handleLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  // 여러 장의 사진이 있으면 배열로 저장하고, 새 장소 정보를 반환하는 함수
  const extractPlaceDetails = (place) => {
    const photos =
      place.photos && place.photos.length > 0
        ? place.photos.map((photo) =>
            photo.getUrl({ maxWidth: 400, maxHeight: 400 }),
          )
        : [];
    const photoUrl = photos.length > 0 ? photos[0] : null;
    const rating = place.rating || null;
    const reviews = place.reviews || null; // 리뷰 데이터 (있으면)
    const newPlace = {
      name: place.name,
      address: place.formatted_address,
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      photoUrl,
      photos, // 전체 이미지 배열
      rating,
      reviews, // 리뷰 배열
      placeId: place.place_id || Date.now().toString(),
    };
    console.log('새 장소 정보:', newPlace);
    return newPlace;
  };

  // Autocomplete에서 장소 선택 시 처리
  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) {
      console.warn('유효한 장소가 선택되지 않았습니다.');
      return;
    }
    processPlace(place);
  };

  // 공통: place 정보 처리 함수
  const processPlace = (place) => {
    const newPlace = extractPlaceDetails(place);
    // 중복 등록 방지
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
      const response = await publicRequest.post(
        `/api/v1/travel-plans/${selectedTravelPlanId}/places`,
        searchedPlace,
      );
      if (response.status === 200) {
        const dbPlaceId = response.data.data.placeId;
        console.log('DB 응답, 새 장소 ID:', dbPlaceId);
        const updatedPlace = { ...searchedPlace, placeId: dbPlaceId };
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
        const wsData = {
          action: 'ADD_PLACE',
          placeName,
          travelPlanId: selectedTravelPlanId,
        };
        if (stompClient && stompClient.connected) {
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
        // 등록 후 검색 결과 및 입력값 초기화
        handleClearSearch();
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

  // "닫기" 버튼 클릭 시 초기화
  const handleClearSearch = () => {
    setInputValue('');
    setSearchedPlace(null);
    setIsRegistered(false);
    if (autocompleteRef.current) {
      const input = document.querySelector('input[placeholder="장소 검색"]');
      if (input) {
        input.value = '';
      }
    }
  };

  // 검색 결과 변경 시 스크롤을 최상단으로 이동시키도록 수정
  useEffect(() => {
    if (searchedPlace) {
      setTimeout(() => {
        const container = document.getElementById('searchResultContainer');
        if (container) {
          container.scrollTop = 0; // 맨 위로 스크롤
        }
      }, 500);
    }
  }, [searchedPlace]);

  // 엔터 키 입력 시, 예측 결과가 선택되지 않았다면 첫 번째 예측 결과 강제 선택
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (!autocompleteRef.current) return;
      const place = autocompleteRef.current.getPlace();
      if (!place || !place.geometry) {
        // 현재 입력값으로 예측 결과 가져오기
        if (window.google && window.google.maps && window.google.maps.places) {
          const autocompleteService =
            new window.google.maps.places.AutocompleteService();
          autocompleteService.getPlacePredictions(
            { input: inputValue },
            (predictions, status) => {
              if (
                status === window.google.maps.places.PlacesServiceStatus.OK &&
                predictions &&
                predictions.length > 0
              ) {
                const firstPrediction = predictions[0];
                const placesService =
                  new window.google.maps.places.PlacesService(
                    document.createElement('div'),
                  );
                placesService.getDetails(
                  { placeId: firstPrediction.place_id },
                  (placeDetails, status) => {
                    if (
                      status ===
                      window.google.maps.places.PlacesServiceStatus.OK
                    ) {
                      processPlace(placeDetails);
                    } else {
                      console.error('Place details fetch failed:', status);
                    }
                  },
                );
              } else {
                console.warn('예측 결과가 없습니다.');
              }
            },
          );
        }
      } else {
        // 이미 선택된 결과가 있다면 그대로 처리
        onPlaceChanged();
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full h-12 pl-4 pr-12 text-base bg-transparent rounded-full focus:outline-none"
          />
          <div className="absolute inset-y-0 flex items-center text-xl text-gray-400 pointer-events-none right-4">
            <FaSearch />
          </div>
          {inputValue && (
            <button
              className="absolute inset-y-0 flex items-center text-gray-500 right-10"
              onClick={handleClearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </Autocomplete>

      {searchedPlace && (
        <Element
          name="searchResultContainer"
          id="searchResultContainer"
          className="mt-2 border border-gray-300 rounded-md bg-white w-[320px] max-h-[400px] overflow-y-auto p-2"
        >
          {/* 이미지 영역: 여러 이미지가 있으면 슬라이더로 */}
          {searchedPlace.photos && searchedPlace.photos.length > 1 ? (
            <Slider {...sliderSettings}>
              {searchedPlace.photos.map((url, idx) => (
                <div key={idx}>
                  <img
                    src={url}
                    alt={`Place ${idx + 1}`}
                    className="w-full h-[200px] object-cover rounded-md mb-2"
                  />
                </div>
              ))}
            </Slider>
          ) : searchedPlace.photoUrl ? (
            <img
              src={searchedPlace.photoUrl}
              alt="Place"
              className="w-full h-[200px] object-cover rounded-md mb-2"
            />
          ) : (
            <div className="w-full h-[200px] flex items-center justify-center bg-gray-200 mb-2">
              <span className="text-sm text-gray-600">No Image</span>
            </div>
          )}

          <div className="text-lg font-bold">{searchedPlace.name}</div>
          <div className="text-sm text-gray-600">{searchedPlace.address}</div>
          {searchedPlace.rating !== null && (
            <div className="flex items-center justify-between mt-2">
              <div className="text-sm text-gray-700">
                별점: {'⭐'.repeat(Math.round(searchedPlace.rating))}
              </div>
              <button
                onClick={handleToggleBookmark}
                className="px-3 font-semibold rounded cursor-pointer text-brown bg-yellow h-9"
                disabled={isRegistered}
              >
                {isRegistered ? '등록 완료' : '장소 등록'}
              </button>
            </div>
          )}

          {/* 리뷰 목록 렌더링 */}
          {searchedPlace.reviews && searchedPlace.reviews.length > 0 && (
            <div className="mt-4">
              <h3 className="mb-2 font-semibold">리뷰</h3>
              {searchedPlace.reviews.map((review, index) => (
                <div
                  key={index}
                  className="p-2 mb-2 text-sm text-gray-700 border rounded"
                >
                  <p>
                    <strong>{review.author_name}</strong>: {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Element>
      )}
    </div>
  );
};

export default MapSearchBar;
