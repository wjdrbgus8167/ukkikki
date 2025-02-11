import React, { useState, useRef, useEffect } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import { Info, TabButton, SearchSection,Places } from './style/PlaceSelectionStyle';

const libraries = ['places'];

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const PlaceSelection = ({
  arrivalCity,
  startDate,
  endDate,
  places,
  onTogglePlace = () => {},
  selectedPlaces = [],
}) => {
  const [isSearchMode, setIsSearchMode] = useState(false);
  const autocompleteRef = useRef(null);
  const [searchedPlace, setSearchedPlace] = useState(null);
  console.log('placesSelection:',places)
  
  // ★ 1) Google Maps API 로드
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries,
  });

  // 좋아요 순 정렬
  const sortedPlaceList = [...places].sort((a, b) => b.likes - a.likes);

  // ★ 2) 기존 placeList에 대해 (사진, rating) 정보를 추가해 저장할 state
  const [enhancedPlaceList, setEnhancedPlaceList] = useState([]);

  // ★ 3) isLoaded 이후, placeList 각 항목에 대해 Places API 호출
  useEffect(() => {
    if (!isLoaded) return;
    if (!places || places.length === 0) return;

    // 구글 PlacesService를 위한 가짜 <div> 생성
    const service = new window.google.maps.places.PlacesService(
      document.createElement('div'),
    );

    // 모든 place에 대해 findPlaceFromQuery -> 데이터 보강
    Promise.all(
      places.map((p) => {
        return new Promise((resolve) => {
          // address, name 등을 합쳐서 query를 구성 (상황에 맞게 수정 가능)
          const query = `${p.name} ${p.address}`;
          const request = {
            query,
            fields: [
              'formatted_address',
              'name',
              'place_id',
              'photos',
              'rating',
              'geometry',
            ],
          };

          service.findPlaceFromQuery(request, (results, status) => {
            if (
              status === window.google.maps.places.PlacesServiceStatus.OK &&
              results &&
              results.length > 0
            ) {
              const placeResult = results[0];
              // photos가 있다면 첫번째 사진의 URL
              const photoUrl =
                placeResult.photos && placeResult.photos.length > 0
                  ? placeResult.photos[0].getUrl({
                      maxWidth: 400,
                      maxHeight: 400,
                    })
                  : null;
              // rating
              const rating = placeResult.rating || null;

              // 기존 place에 새 필드 추가
              resolve({
                ...p,
                photoUrl,
                rating,
              });
            } else {
              // 검색 실패 또는 결과 없음 -> 원본 그대로 반환 (사진/평점 없음)
              resolve({
                ...p,
                photoUrl: null,
                rating: null,
              });
            }
          });
        });
      }),
    ).then((enhanced) => {
      // 모든 place에 대한 정보 보강을 마친 뒤 state에 저장
      setEnhancedPlaceList(enhanced);
    });
  }, [isLoaded, places]);

  // Autocomplete에서 장소가 선택되었을 때 실행
  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry && place.geometry.location) {
        // photos가 있다면 첫 번째 사진 URL
        const photoUrl =
          place.photos && place.photos.length > 0
            ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
            : null;

        // rating
        const rating = place.rating || null;

        const newPlace = {
          id: Date.now(), // 고유 ID 생성
          name: place.name,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
          likes: 0,
          photoUrl, // ★ 사진
          rating, // ★ 평점
        };
        setSearchedPlace(newPlace);
      }
    }
  };

  
  return (
    <div>
      <Info>
        <h1> {arrivalCity}</h1>
        <h3>
          {startDate} ~ {endDate}
        </h3>
      </Info>
  
      <div>
        {/* 탭 스위치 버튼 */}
      
        <TabButton>
          <button
            onClick={() => setIsSearchMode(false)}
            className={!isSearchMode ? "active" : "inactive"}
          >
            여행 장소 목록
          </button>
          <button
            onClick={() => setIsSearchMode(true)}
            className={isSearchMode ? "active" : "inactive"}
          >
            새로운 장소 검색
          </button>
        </TabButton>


      <Places>
        {/* "여행 장소 목록" 탭 */}
      {!isSearchMode && (
        <>
          <h2 className="text-xl font-bold mb-4">여행 장소 목록</h2>
          <ul>
            {enhancedPlaceList.map((place) => {
              const isSelected = selectedPlaces.some((p) => p.id === place.id);
              return (
                <li
                  key={place.id}
                  className="flex justify-between items-center mb-2"
                >
                  <div className="flex items-center">
                    {/* 사진이 있으면 표시 */}
                    {place.photoUrl ? (
                      <img
                        src={place.photoUrl}
                        alt={place.name}
                        className="w-20 h-20 object-cover aspect-square mr-4"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-sm text-gray-600">No Image</span>
                      </div>
                    )}

                    <div>
                      <p className="font-semibold">{place.name}</p>
                      <p className="text-sm text-gray-600">{place.address}</p>
                      <p className="text-sm text-gray-600">
                        좋아요👍: {place.likeCount}
                      </p>
                      {/* 평점이 있을 때만 표시 */}
                      {place.rating && (
                        <p className="text-sm text-gray-600">
                          평점❤️:  {place.rating}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => onTogglePlace(place)}
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

      {/* "새로운 장소 검색" 탭 */}
      {isSearchMode && (
        <>
          <SearchSection>
          <h2>장소 검색</h2>
          {isLoaded ? (
            <Autocomplete onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)} onPlaceChanged={onPlaceChanged}>
              <input type="text" placeholder="장소를 입력해주세요" />
            </Autocomplete>
          ) : (
            <p>지도 로딩중...</p>
          )}
        </SearchSection>

          {/* 검색한 장소 표시 */}
          {searchedPlace && (
            <div className="mt-4 p-3 border rounded-lg shadow flex items-center">
              {searchedPlace.photoUrl ? (
                <img
                  src={searchedPlace.photoUrl}
                  alt={searchedPlace.name}
                  className="w-24 h-24 object-cover aspect-square mr-4"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-sm text-gray-600">No Image</span>
                </div>
              )}

              <div>
                <p className="font-semibold">{searchedPlace.name}</p>
                <p className="text-sm text-gray-600">{searchedPlace.address}</p>
                {searchedPlace.rating && (
                  <p className="text-sm text-gray-600">
                    평점: ★ {searchedPlace.rating}
                  </p>
                )}
                <button
                  onClick={() => onTogglePlace(searchedPlace)}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  선택하여 추가
                </button>
              </div>
            </div>
          )}
        </>
      )}
      </Places>
      </div>

      
    </div>
  );
};

export default PlaceSelection;
