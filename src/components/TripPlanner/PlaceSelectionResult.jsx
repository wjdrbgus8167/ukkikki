import React, { useState } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const PlaceSelectionResult = ({ selectedDay }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="relative flex">
      {/* 🔥 접기/펼치기 버튼 (오른쪽 사이드) */}
      <button
        onClick={() => setIsCollapsed((prev) => !prev)}
        className="absolute -right-5 top-1/2 transform -translate-y-1/2 bg-gray-500 text-white p-2 rounded-full shadow-md hover:bg-gray-600 transition-colors"
      >
        {isCollapsed ? (
          <AiOutlineLeft size={20} />
        ) : (
          <AiOutlineRight size={20} />
        )}
      </button>

      {/* 🔥 PlaceSelectionResult 패널 */}
      <div
        className={`p-4 bg-white shadow-md transition-all duration-300 ${
          isCollapsed ? 'w-0 overflow-hidden p-0' : 'w-80'
        }`}
      >
        <h2 className="text-xl font-bold">
          {selectedDay?.label} ({selectedDay?.date})의 선택된 장소
        </h2>

        {!isCollapsed && (
          <>
            {selectedDay?.selectedPlaces?.length > 0 ? (
              <ul>
                {selectedDay.selectedPlaces.map((place, index) => (
                  <li key={index} className="mb-2">
                    <p className="font-semibold">{place.name}</p>
                    <p className="text-sm text-gray-600">{place.address}</p>
                    <p className="text-sm text-gray-600">
                      좋아요: {place.likes}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">선택된 장소가 없습니다.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PlaceSelectionResult;
