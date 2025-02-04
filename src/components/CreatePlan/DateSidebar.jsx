import React from 'react';

const DateSidebar = ({ travelDays, selectedDayId, onDaySelect }) => {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">여행 일정</h2>
      <div className="flex flex-col space-y-2">
        {travelDays.map((day) => (
          <button
            key={day.id}
            onClick={() => onDaySelect(day.id)}
            className={`px-4 py-2 rounded transition-colors ${
              day.id === selectedDayId
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DateSidebar;
