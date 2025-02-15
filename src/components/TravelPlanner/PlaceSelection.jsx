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

const libraries = ['places'];
const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const PlaceSelection = ({ onSelectPlace }) => {
    const { proposal, selectedDayId } = useContext(ProposalDetailContext);
    const [isSearchMode, setIsSearchMode] = useState(false);
    const [searchedPlace, setSearchedPlace] = useState(null);
    const [enhancedPlaceList, setEnhancedPlaceList] = useState([]);
    const autocompleteRef = useRef(null);
    
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        if (!isLoaded) return;
        if (!places || places.length === 0) return;
    
        const service = new window.google.maps.places.PlacesService(
          document.createElement('div'),
        );
    
        Promise.all(
          places.map((p) => {
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
                if (
                  status === window.google.maps.places.PlacesServiceStatus.OK &&
                  results &&
                  results.length > 0
                ) {
                  const placeResult = results[0];
                  const photoUrl =
                    placeResult.photos && placeResult.photos.length > 0
                      ? placeResult.photos[0].getUrl({
                          maxWidth: 400,
                          maxHeight: 400,
                        })
                      : null;
                  const rating = placeResult.rating || null;
    
                  resolve({
                    ...p,
                    photoUrl,
                    rating,
                  });
                } else {
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
