import React, { useContext, useState, useRef, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import ProposalDetailContext from '../../contexts/ProposalDetailContext';
import { 
    StyledContainer,
    DayLabel,
    DayDate,
    TabButton,
    StylePlaceList,
} from "./style/PlaceSelectionStyle";

const libraries = ['places'];
const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const PlaceSelection = () => {
    const { proposal, selectedDayId } = useContext(ProposalDetailContext);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchedPlace, setSearchedPlace] = useState(null);
    const [enhancedPlaceList, setEnhancedPlaceList] = useState([]);
    const autocompleteRef = useRef(null);
    
    //Google Map API 로드
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries,
      });
    
      
    
    if (!proposal) {
        return <div>로딩중</div>;
    }
    const { travelPlan } = proposal.data;
    const { places } = travelPlan;
    
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
              photoUrl, // ★ 사진
              rating, // ★ 평점
            };
            setSearchedPlace(newPlace);
          }
        }
      };
    


    
      

    // travelDays 계산 함수
    const getTravelDays = (startDate, endDate) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
        return Array.from({ length: diffDays }, (_, i) => ({
            id: i + 1,
            label: `${i + 1}일차`,
            date: new Date(start.getTime() + i * 86400000)
                .toISOString()
                .split("T")[0],
            selectedPlaces: [],
        }));
    };

    const travelDays = getTravelDays(travelPlan.startDate, travelPlan.endDate);
    const selectedDay = travelDays.find((day) => day.id === selectedDayId);


    return (
        <StyledContainer>
            {selectedDay && (
                <>
                    <DayLabel>{selectedDay.label}</DayLabel>
                    <DayDate>_ [{selectedDay.date}]</DayDate>
                </>
            )}
            <TabButton>
                <button
                    onClick={() => setIsSearchMode(false)}
                    className={!isSearchMode ? "active" : "inactive"}
                >
                제안 장소 목록
                </button>
                <button
                    onClick={() => setIsSearchMode(true)}
                    className={isSearchMode ? "active" : "inactive"}
                >
                새로운 장소 검색
                </button>
            </TabButton>
            <div>
                <StylePlaceList>
                    {!isSearchMode && (
                        <ul>

                        </ul>
                    )}
                </StylePlaceList>
            </div>
        </StyledContainer>
    );
};

export default PlaceSelection;
