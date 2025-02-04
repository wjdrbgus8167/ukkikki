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
            className={`add-button bg-white text-black text-x font-semibold py-2 px-4 border-2 border-gray-300 rounded-lg w-24 h-16 transition-colors 
              ${
                day.id === selectedDayId
                  ? 'bg-yellow text-brown border-blue-500'
                  : 'hover:bg-gray-100'
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
