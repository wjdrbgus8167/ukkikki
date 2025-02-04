// src/components/CreatePlan/MainLayout.jsx
import React, { useState } from 'react';
import DateSidebar from './DateSidebar';
import PlaceSelection from './PlaceSelection';
import PlaceSelectionResult from './PlaceSelectionResult';
import MapDisplay from './MapDisplay';

const MainLayout = ({ travelPlan }) => {
  const { travelStart, travelEnd, placeList, destinationCity } = travelPlan;

  // 여행 시작일과 종료일로부터 일자 배열 생성 (종료일 포함)
  const getTravelDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    const daysArray = [];
    for (let i = 0; i < diffDays; i++) {
      const currentDate = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = currentDate.toISOString().split('T')[0];
      daysArray.push({
        id: i + 1,
        label: `${i + 1}일차`,
        date: formattedDate,
        selectedPlaces: [], // 각 일자별 선택된 장소 배열
      });
    }
    return daysArray;
  };

  const initialTravelDays = getTravelDays(travelStart, travelEnd);

  // travelDays와 현재 선택된 일자를 상태로 관리
  const [travelDays, setTravelDays] = useState(initialTravelDays);
  const [selectedDayId, setSelectedDayId] = useState(travelDays[0].id);

  // 사이드바 버튼 클릭 시 선택된 일자 변경
  const handleDaySelect = (dayId) => {
    setSelectedDayId(dayId);
  };

  // 플러스 버튼 클릭 시 선택된 일자에 장소 추가
  const handleAddPlace = (place) => {
    setTravelDays((prevDays) =>
      prevDays.map((day) => {
        if (day.id === selectedDayId) {
          // 같은 장소가 중복으로 추가되는 것을 방지하려면 조건을 추가할 수 있음.
          return {
            ...day,
            selectedPlaces: [...day.selectedPlaces, place.name],
          };
        }
        return day;
      }),
    );
  };

  // 현재 선택된 일자의 데이터
  const selectedDay = travelDays.find((day) => day.id === selectedDayId);

  return (
    <div className="flex h-full space-x-4">
      {/* 사이드바: 일자 버튼 */}
      <div className="w-1/6 border-r">
        <DateSidebar
          travelDays={travelDays}
          selectedDayId={selectedDayId}
          onDaySelect={handleDaySelect}
        />
      </div>

      {/* 장소 선택 영역 (너비를 w-1/4로 줄임) */}
      <div className="w-1/4 border-r">
        <PlaceSelection
          destinationCity={destinationCity}
          travelStart={travelStart}
          travelEnd={travelEnd}
          placeList={placeList}
          onAddPlace={handleAddPlace}
        />
      </div>

      {/* 선택한 장소 결과 영역 (너비를 w-1/4로 줄임) */}
      <div className="w-1/4 border-r">
        <PlaceSelectionResult selectedDay={selectedDay} />
      </div>

      {/* 지도 컴포넌트 */}
      <div className="w-1/6">
        <MapDisplay />
      </div>
    </div>
  );
};

export default MainLayout;

// //전체 레이아웃을 정의하는 컴포넌트
// // 사이드바 + 지도 영역

// import TravelPlanMap from "./TravelPlanMap";
// import PlanDateSideBar from "./PlanDateSideBar";
// import TravelPlan from "./TravelPlan";
// import { LoadScript } from '@react-google-maps/api';

// const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;
// const MainLayout = () => {
//     return (
//         <div className="flex items-start space-x-4">
//             <PlanDateSideBar />
//             <TravelPlan />

//             <LoadScript googleMapsApiKey={apiKey}>
//                 <div className="flex items-start space-x-4">
//                     <TravelPlanMap />
//                 </div>
//             </LoadScript>

//         </div>
//     )
// };
// export default MainLayout;
