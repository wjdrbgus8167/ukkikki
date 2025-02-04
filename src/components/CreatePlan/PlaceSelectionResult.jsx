import React, { useState } from 'react';

const PlaceSelectionResult = ({ selectedDay }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {selectedDay.label} ({selectedDay.date})의 선택된 장소
        </h2>
        <button
          onClick={() => setIsCollapsed((prev) => !prev)}
          className="px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          {isCollapsed ? '펼치기' : '접기'}
        </button>
      </div>
      {!isCollapsed && (
        <>
          {selectedDay.selectedPlaces &&
          selectedDay.selectedPlaces.length > 0 ? (
            <ul>
              {selectedDay.selectedPlaces.map((place, index) => (
                <li key={index} className="mb-2">
                  {place}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">선택된 장소가 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PlaceSelectionResult;
