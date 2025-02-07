import React, { useState } from 'react';


const DateSidebar = ({ travelDays, selectedDayId, onDaySelect,onToggleDetailForm }) => {

  const [ detailActive, setDetailActive ] = useState(false);
  
  const handleDetailClick = () => {
    setDetailActive((prev) => !prev);
    onToggleDetailForm()
  }

  return (
    <div className="p-4">
      <div className="flex flex-col space-y-2">
        {travelDays.map((day) => (
          <button
            key={day.id}
            onClick={() => onDaySelect(day.id)}
            className={`schedule-btn bg-white text-black text-x font-semibold py-2 px-4 border-2 border-gray-300 rounded-lg w-[26] h-16 transition-colors 
              ${
                day.id === selectedDayId
                  ? 'bg-yellow text-brown'
                  : 'hover:bg-gray-100'
              }`}
          >
            {day.label}
          </button>
        ))}
        <button 
        onClick={handleDetailClick}
        className={`detail-schedule-btn text-black text-x font-semibold py-2 px-4 border-2 border-gray-300 rounded-lg w-[26] h-16 transition-colors
          `}>
          상세내용
        </button>
      </div>
    </div>
  );
};

export default DateSidebar;
