// DateSidebar.jsx
import React, { useState } from 'react';
import {
  SidebarContainer,
  ButtonList,
  ScheduleButton,
  DetailButton,
} from './style/DateSidebarStyle';

const DateSidebar = ({ travelDays, selectedDayId, onDaySelect, onToggleDetailForm }) => {
  const [detailActive, setDetailActive] = useState(false);

  const handleDetailClick = () => {
    setDetailActive((prev) => !prev);
    onToggleDetailForm();
  };

  return (
    <SidebarContainer>
      <ButtonList>
        {travelDays.map((day) => (
          <ScheduleButton
            key={day.id}
            active={day.id === selectedDayId}
            onClick={() => onDaySelect(day.id)}
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
