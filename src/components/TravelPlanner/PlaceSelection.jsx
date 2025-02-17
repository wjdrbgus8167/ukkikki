import React, { useContext, useState, useRef, useEffect } from "react";
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';
import ProposalDetailContext from '../../contexts/ProposalDetailContext';
import SuggestedPlaceList from "./PlaceList/SuggestedPlaceList";
import SearchPlace from "./PlaceList/SearchPlace";
import { 
    StyledContainer,
    DayLabel,
    DayDate,
    TabButton,
} from "./style/PlaceSelectionStyle";
import { v4 as uuidv4 } from 'uuid';

const libraries = ['places'];
const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const PlaceSelection = ({ onSelectPlace }) => {
    const { proposal, selectedDayId } = useContext(ProposalDetailContext);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchedPlace, setSearchedPlace] = useState(null);
    const [enhancedPlaceList, setEnhancedPlaceList] = useState([]);
    const autocompleteRef = useRef(null);
    // ref를 사용하여 enhancedPlaceList를 한 번만 생성하도록 함
    const enhancedPlacesRef = useRef(null);
    
    // Google Map API 로드
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
        if (!isLoaded || !places || places.length === 0) return;
        // 이미 enhancedPlaceList가 생성되어 있다면 재생성하지 않음
        if (enhancedPlacesRef.current) {
            setEnhancedPlaceList(enhancedPlacesRef.current);
            return;
        }
    
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div')
        );
    
        Promise.all(
          places.map((p, idx) => {
            return new Promise((resolve) => {
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
                let photoUrl = null;
                let rating = null;
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  results &&
                  results.length > 0
                ) {
                  const placeResult = results[0];
                  photoUrl =
                    placeResult.photos && placeResult.photos.length > 0
                      ? placeResult.photos[0].getUrl({
                          maxWidth: 400,
                          maxHeight: 400,
                        })
                      : null;
                  rating = placeResult.rating || null;
                }
                resolve({
                  // p.id가 없다면 한 번만 uuidv4()로 id를 생성합니다.
                  id: p.id || uuidv4(),
                  ...p,
                  photoUrl,
                  rating,
                });
              });
            });
          })
        ).then((enhanced) => {
          enhancedPlacesRef.current = enhanced;
          setEnhancedPlaceList(enhanced);
        });
    }, [isLoaded, places]);
    
    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
          const place = autocompleteRef.current.getPlace();
          if (place.geometry && place.geometry.location) {
            const photoUrl =
              place.photos && place.photos.length > 0
                ? place.photos[0].getUrl({ maxWidth: 400, maxHeight: 400 })
                : null;
            const rating = place.rating || null;
    
            const newPlace = {
              id: Date.now(),
              name: place.name,
              address: place.formatted_address,
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              photoUrl,
              rating,
            };
            setSearchedPlace(newPlace);
          }
        }
    };
    
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

    console.log("onSelectDay prop 전달 값:", selectedDay.date);
    
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
            <div className="place-list">
                {!isSearchMode ? (
                    <SuggestedPlaceList 
                      places={enhancedPlaceList} 
                      onSelectPlace={onSelectPlace}
                      onSelectDay={selectedDay.date} 
                    />
                ) : (
                    <SearchPlace 
                      isLoaded={isLoaded}
                      autocompleteRef={autocompleteRef}
                      onPlaceChanged={onPlaceChanged}
                      searchedPlace={searchedPlace}
                      onSelectPlace={(place) => {
                          console.log('onSelectPlace called with:', place);
                          onSelectPlace(place); 
                      }}
                    />
                )}
            </div>
        </StyledContainer>
    );
};

export default PlaceSelection;
