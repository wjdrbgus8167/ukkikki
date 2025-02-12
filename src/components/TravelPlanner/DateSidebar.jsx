// DateSidebar.jsx
import React, { useState, useContext } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import {
  SidebarContainer,
  ButtonList,
  ScheduleButton,
  DetailButton,
} from "./style/DateSidebarStyle";

const DateSidebar = ({ }) => {
  const { proposal } = useContext(ProposalDetailContext);
  const [detailActive, setDetailActive] = useState(false);

  const [selectedDayId, setSelectedDayId] = useState(null);
  if (!proposal) {
    return <div>Loading...</div>;
  }

  const { startDate, endDate } = proposal.data.travelPlan;

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

  const travelDays = getTravelDays(startDate, endDate);

  // 컴포넌트가 처음 렌더링될 때, 첫 번째 일자를 선택 상태로 설정
  if (selectedDayId === null && travelDays.length > 0) {
    setSelectedDayId(travelDays[0].id);
  }
    
    // 일자 버튼 클릭 시 호출되는 핸들러: 선택 상태 업데이트
  const handleDaySelect = (dayId) => {
    setSelectedDayId(dayId);
  };

  const handleDetailClick = () => {
    setDetailActive((prev) => !prev);
  };

  return (
    <SidebarContainer>
      <ButtonList>
        {travelDays.map((day) => (
          <ScheduleButton
            key={day.id}
            active={day.id === selectedDayId}
            onClick={() => handleDaySelect(day.id)}
          >
            {day.label}
          </ScheduleButton>
        ))}
        <DetailButton onClick={handleDetailClick}>
          상세내용
        </DetailButton>
      </ButtonList>
    </SidebarContainer>
  );
};

export default DateSidebar;
