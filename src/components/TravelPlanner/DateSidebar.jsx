import React, { useContext, useState, useMemo, useEffect } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import {
  SidebarContainer,
  ButtonList,
  ScheduleButton,
  DetailButton,
  SubmitButton,
} from "./style/DateSidebarStyle";

const DateSidebar = ({ onToggleDetailForm, onDaySelect, onSubmit }) => {
  const { proposal, setSelectedDay, selectedDayId } = useContext(ProposalDetailContext);
  const [detailActive, setDetailActive] = useState(false);

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
      setSelectedDay(travelDays[0].id);
    }
  }, [proposal, selectedDayId, travelDays, setSelectedDay]);

  if (!proposal) {
    return <div>Loading...</div>;
  }

  const handleDaySelect = (dayId) => {
    setDetailActive(false)
    setSelectedDay(dayId);
    if (onDaySelect) onDaySelect(dayId);
  };

  const handleDetailClick = () => {
    setDetailActive((prev) => !prev);
    if (onToggleDetailForm) onToggleDetailForm();
  };

  return (
    <SidebarContainer>
      <ButtonList>
        {travelDays.map((day) => (
          <ScheduleButton
            key={day.id}
            active={!detailActive && day.id === selectedDayId}
            onClick={() => handleDaySelect(day.id)}
          >
            {day.label}
          </ScheduleButton>
        ))}
        <DetailButton 
          onClick={handleDetailClick}
          active={detailActive}
          >
          상세내용
        </DetailButton>
      </ButtonList>
      <SubmitButton onClick={onSubmit} >
           제출
      </SubmitButton>
    </SidebarContainer>
  );
};

export default DateSidebar;
