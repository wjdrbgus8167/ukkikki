import React, { useState } from 'react';
import DateSidebar from './DateSidebar';
import PlaceSelection from './PlaceSelection';
import PlaceSelectionResult from './PlaceSelectionResult';
import MapDisplay from './MapDisplay';
import DetailForm from './DetailForm';
import { LoadScript } from '@react-google-maps/api';
import { StyledLoadScript, StyledPlaceSelectionResult } from './style/MainLayoutStyle'; // 스타일드 컴포넌트 import

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const MainLayout = ({ travelPlan }) => {
  const { travelStart, travelEnd, placeList, destinationCity } = travelPlan;

  const getTravelDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.floor((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return Array.from({ length: diffDays }, (_, i) => ({
      id: i + 1,
      label: `${i + 1}일차`,
      date: new Date(start.getTime() + i * 86400000)
        .toISOString()
        .split('T')[0],
      selectedPlaces: [],
    }));
  };

  const initialTravelDays = getTravelDays(travelStart, travelEnd);

  const [travelDays, setTravelDays] = useState(initialTravelDays);
  const [selectedDayId, setSelectedDayId] = useState(travelDays[0]?.id || 1);
  const [showDetailFrom, setShowDetailFrom] = useState(false);
  const [isResultVisible, setIsResultVisible] = useState(true); // PlaceSelectionResult 접기/펼치기 상태

  const handleDaySelect = (dayId) => {
    setSelectedDayId(dayId);
    setShowDetailFrom(false);
  };

  const handleAddPlace = (place) => {
    setTravelDays((prevDays) =>
      prevDays.map((day) =>
        day.id === selectedDayId
          ? {
              ...day,
              selectedPlaces: [...new Set([...day.selectedPlaces, place])],
            }
          : day
      )
    );
  };

  const handleTogglePlace = (place) => {
    console.log('handleTogglePlace 실행됨:', place);
    if (!place.latitude || !place.longitude) {
      console.error('🚨 경도 또는 위도가 없습니다!', place);
      return;
    }

    setTravelDays((prevDays) =>
      prevDays.map((day) =>
        day.id === selectedDayId
          ? {
              ...day,
              selectedPlaces: day.selectedPlaces?.some((p) => p.id === place.id)
                ? day.selectedPlaces.filter((p) => p.id !== place.id)
                : [...(day.selectedPlaces || []), place],
            }
          : day
      )
    );
  };

  const selectedDay = travelDays.find((day) => day.id === selectedDayId);

  const onToggleDetailForm = () => {
    setShowDetailFrom((prev) => !prev);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-1/10 border-r flex-shrink-0">
        <DateSidebar
          travelDays={travelDays}
          selectedDayId={selectedDayId}
          onDaySelect={handleDaySelect}
          onToggleDetailForm={onToggleDetailForm}
        />
      </div>

      {showDetailFrom ? (
        <div className="flex-grow h-full">
          <DetailForm />
        </div>
      ) : (
        <>
          <StyledLoadScript>
            <LoadScript
              googleMapsApiKey={apiKey}
              libraries={['places']}
            >
              <div>
                <PlaceSelection
                  destinationCity={destinationCity}
                  travelStart={travelStart}
                  travelEnd={travelEnd}
                  placeList={placeList}
                  onTogglePlace={handleTogglePlace}
                  selectedPlaces={selectedDay?.selectedPlaces || []}
                />
              </div>
            </LoadScript>
          </StyledLoadScript>

          {/* 접기/펼치기 버튼 */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setIsResultVisible((prev) => !prev)}
              className="p-2 m-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              {isResultVisible ? '결과 접기' : '결과 보기'}
            </button>
          </div>

          {isResultVisible && (
            <StyledPlaceSelectionResult>
              <PlaceSelectionResult
                selectedDay={selectedDay ?? { selectedPlaces: [] }}
              />
            </StyledPlaceSelectionResult>
          )}

          <div className="flex-grow h-full">
            <MapDisplay
              destinationCity={destinationCity}
              selectedPlaces={selectedDay?.selectedPlaces || []}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainLayout;
