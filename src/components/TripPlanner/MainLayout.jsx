import React, { useState } from 'react';
import DateSidebar from './DateSidebar';
import PlaceSelection from './PlaceSelection';
import PlaceSelectionResult from './PlaceSelectionResult';
import MapDisplay from './MapDisplay';

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

  const handleDaySelect = (dayId) => {
    setSelectedDayId(dayId);
  };

  const handleAddPlace = (place) => {
    setTravelDays((prevDays) =>
      prevDays.map((day) =>
        day.id === selectedDayId
          ? {
              ...day,
              selectedPlaces: [...new Set([...day.selectedPlaces, place])], // ✅ 중복 방지
            }
          : day,
      ),
    );
  };
  const handleTogglePlace = (place) => {
    console.log('handleTogglePlace 실행됨:', place); // ✅ 디버깅
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
                ? day.selectedPlaces.filter((p) => p.id !== place.id) // ✅ 삭제 기능 추가
                : [...(day.selectedPlaces || []), place], // ✅ 추가
            }
          : day,
      ),
    );
  };
  const selectedDay = travelDays.find((day) => day.id === selectedDayId);

  return (
    <div className="flex w-full h-screen">
      {/* 사이드바 (비율 1) */}
      <div className="w-1/10 border-r flex-shrink-0">
        <DateSidebar
          travelDays={travelDays}
          selectedDayId={selectedDayId}
          onDaySelect={handleDaySelect}
        />
      </div>

      {/* 장소 선택 (비율 3) */}
      <div className="border-r ">
        <PlaceSelection
          destinationCity={destinationCity}
          travelStart={travelStart}
          travelEnd={travelEnd}
          placeList={placeList}
          onTogglePlace={handleTogglePlace} // ✅ 함수 전달
          selectedPlaces={selectedDay?.selectedPlaces || []}
        />
      </div>

      {/* 선택한 장소 결과 (비율 3) */}
      <div className="border-r">
        <PlaceSelectionResult
          selectedDay={selectedDay ?? { selectedPlaces: [] }}
        />{' '}
      </div>

      {/* 지도 컴포넌트 (비율 3) */}
      <div className="flex-grow h-full">
        <MapDisplay
          destinationCity={destinationCity}
          selectedPlaces={selectedDay?.selectedPlaces || []}
        />
      </div>
    </div>
  );
};

export default MainLayout;
