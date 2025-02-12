import React, { useState, useContext, useEffect, useMemo } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import {
  SidebarContainer,
  ButtonList,
  ScheduleButton,
  DetailButton,
} from "./style/DateSidebarStyle";

const DateSidebar = () => {
  const { proposal, setSelectedDay, selectedDayId } = useContext(ProposalDetailContext);
  const [detailActive, setDetailActive] = useState(false);

  // 훅은 항상 호출되어야 하므로 여기서 travelDays를 메모이제이션
  const travelDays = useMemo(() => {
    if (!proposal) return [];
    const { startDate, endDate } = proposal.data.travelPlan;
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
  }, [proposal]);

  useEffect(() => {
    if (proposal && selectedDayId === null && travelDays.length > 0) {
      setSelectedDay(travelDays[0].id); // 첫 번째 일자(1일차)를 기본으로 설정
    }
  }, [proposal, selectedDayId, travelDays, setSelectedDay]);

  // proposal이 없으면 여기서 로딩 상태를 반환
  if (!proposal) {
    return <div>Loading...</div>;
  }

  // 나머지 렌더링
  const handleDaySelect = (dayId) => {
    setSelectedDay(dayId);
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
