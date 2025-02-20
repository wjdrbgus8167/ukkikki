import React, { useEffect, useState } from 'react';
import { Autocomplete } from '@react-google-maps/api';
import banana from '../../../assets/loading-spinner.png';
const SearchPlace = ({
  isLoaded,
  autocompleteRef,
  onPlaceChanged, // 기존 onPlaceChanged도 받을 수 있지만 여기서는 내부 처리로 리뷰 요청 진행
  searchedPlace,
  onSelectPlace,
  setSearchedPlace, // 부모에서 상태 업데이트를 위한 함수 전달 (또는 내부 상태로 관리 가능)
}) => {
  // 리뷰를 불러오는 useEffect
  useEffect(() => {
    // searchedPlace가 설정되어 있고, 아직 reviews가 없는 경우에만 실행
    if (
      searchedPlace &&
      searchedPlace.placeId &&
      !searchedPlace.reviews &&
      window.google &&
      window.google.maps &&
      window.google.maps.places
    ) {
      const service = new window.google.maps.places.PlacesService(
        document.createElement('div'),
      );
      service.getDetails(
        {
          placeId: searchedPlace.placeId,
          fields: ['reviews'],
        },
        (result, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            result.reviews
          ) {
            // 기존 searchedPlace에 reviews 필드를 추가하여 업데이트
            setSearchedPlace((prev) => ({
              ...prev,
              reviews: result.reviews,
            }));
          }
        },
      );
    }
  }, [searchedPlace, setSearchedPlace]);

  // 내부 onPlaceChanged: Autocomplete 컴포넌트에서 호출됨
  const handlePlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      console.log('Place changed:', place);
      if (place.geometry && place.geometry.location) {
        const photoUrl =
          place.photos && place.photos.length > 0
            ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
            : null;
        const rating = place.rating || null;
        // place_id를 추가해서 리뷰 조회에 활용
        const newPlace = {
          id: Date.now(),
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          photoUrl,
          rating,
        };
        // 부모로부터 전달받은 setSearchedPlace를 통해 상태 업데이트
        setSearchedPlace(newPlace);
      }
    }
  };

  return (
    <>
      <div>
        {isLoaded ? (
          <Autocomplete
            onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
            onPlaceChanged={handlePlaceChanged}
          >
            <input
              type="text"
              placeholder="장소를 입력해주세요"
              className="w-full p-2 border rounded-xl"
            />
          </Autocomplete>
        ) : (
          <p>지도 로딩중...</p>
        )}
      </div>

      {searchedPlace && (
        <div className="flex flex-col p-3 mt-4 bg-white border rounded-lg shadow">
          <div className="flex items-center">
            {searchedPlace.photoUrl ? (
              <img
                src={searchedPlace.photoUrl}
                alt={searchedPlace.name}
                className="object-cover w-24 h-24 mr-4 aspect-square"
              />
            ) : (
              <img
                src={banana} // 여기에 기본 이미지 경로를 지정합니다.
                alt="Default"
                className="object-cover w-24 h-24 mr-4 aspect-square"
              />
            )}

            <div>
              <p className="font-semibold">{searchedPlace.name}</p>
              <p className="text-sm text-gray-600">{searchedPlace.address}</p>
              {searchedPlace.rating && (
                <p className="text-sm text-gray-600">
                  평점: ★ {searchedPlace.rating}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                onSelectPlace({
                  scheduleName: searchedPlace.name,
                  latitude: searchedPlace.latitude,
                  longitude: searchedPlace.longitude,
                  imageUrl: searchedPlace.photoUrl,
                })
              }
              className="p-2 ml-auto text-lg"
            >
              ✔️
            </button>
          </div>

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
        </div>
      )}
    </>
  );
};

export default SearchPlace;
