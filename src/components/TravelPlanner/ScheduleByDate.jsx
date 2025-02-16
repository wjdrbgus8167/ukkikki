import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import Schedule from "./PlaceList/SchedulePlaces";
import { Info, ScheduleByDateContainer, ButtonContainer, ScheduleContainer } from "./style/ScheduleByDateStyle";

const ScheduleByDate = ({ onTogglePlaceSelection, selectedPlaces = [], onDeletePlace, onAddTime }) => {
  const [timeData, setTimeData] = useState({});
  const [showTimeInput, setShowTimeInput] = useState(null);
  const { proposal } = useContext(ProposalDetailContext);

  if (!proposal) {
    return <div>로딩중</div>;
  }

  const { arrivalCity, startDate, endDate } = proposal.data.travelPlan;

  // 두 시간의 차이를 계산하여 "X시간 Y분" 형태의 문자열 반환
  const computeDuration = (startTime, endTime) => {
    const [sHours, sMinutes] = startTime.split(":").map(Number);
    const [eHours, eMinutes] = endTime.split(":").map(Number);
    let startTotal = sHours * 60 + sMinutes;
    let endTotal = eHours * 60 + eMinutes;
    if (endTotal < startTotal) {
      endTotal += 24 * 60;
    }
    const diff = endTotal - startTotal;
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return hours > 0 ? `${hours}시간 ${minutes} 분` : `${minutes} 분`;
  };

  const handleSaveTime = (placeId, dayNumber) => {
    const rawData = timeData[placeId];
    if (!rawData || !rawData.startTime || !rawData.endTime) return;
    const fullStartTime = computeFullTime(dayNumber, rawData.startTime);
    const fullEndTime = computeFullTime(dayNumber, rawData.endTime);
    onAddTime(placeId, fullStartTime, fullEndTime);
    setShowTimeInput(null);
  };

  const handleTimeInputToggle = (placeId) => {
    setShowTimeInput(showTimeInput === placeId ? null : placeId);
  };

  const handleTimeChange = (placeId, type, value) => {
    setTimeData((prevData) => ({
      ...prevData,
      [placeId]: {
        ...prevData[placeId],
        [type]: value,
      },
    }));
  };

  const computeFullTime = (dayNumber, timeStr) => {
    const baseDate = new Date(startDate);
    baseDate.setDate(baseDate.getDate() + (dayNumber - 1));

    const [hours, minutes] = timeStr.split(":");
    baseDate.setHours(Number(hours), Number(minutes), 0, 0);
    return baseDate.toISOString().split(".")[0];
  };

  return (
    <ScheduleByDateContainer>
      <Info>
        <h1>{arrivalCity.name}</h1>
        <h3>{startDate} ~ {endDate}</h3>
      </Info>

      <ScheduleContainer>
        {/* 선택된 장소들을 표시하는 영역 */}
        {selectedPlaces.length > 0 && (
            <Schedule
            selectedPlaces={selectedPlaces}
            timeData={timeData}
            onDeletePlace={onDeletePlace}
            handleTimeInputToggle={handleTimeInputToggle}
            showTimeInput={showTimeInput}
            handleTimeChange={handleTimeChange}
            handleSaveTime={handleSaveTime}
            computeDuration={computeDuration}
            />
        )}

        <ButtonContainer>
            <button onClick={onTogglePlaceSelection}>
            장소 추가
            </button>
        </ButtonContainer>
      </ScheduleContainer>
      
    </ScheduleByDateContainer>
  );
};

export default ScheduleByDate;
