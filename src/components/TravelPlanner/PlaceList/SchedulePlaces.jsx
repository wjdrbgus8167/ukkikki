import React, { useEffect, useRef } from "react";
import clock from "../../../assets/clock.png"; // 상대 경로로 수정
import trashCan from "../../../assets/trash_can.png"; // 상대 경로로 수정
import { SelectedPlacesContainer, SelectedPlacesContent } from "./style/SchedulePlacesStyle";

const Schedule = ({
  selectedPlaces,
  timeData,
  onDeletePlace,
  handleTimeInputToggle,
  showTimeInput,
  handleTimeChange,
  handleSaveTime,
  computeDuration,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight; // 새로운 항목이 추가될 때마다 가장 아래로 스크롤
    }
  }, [selectedPlaces]);

  return (
    <SelectedPlacesContainer ref={containerRef}>
      {selectedPlaces.map((place, index) => {
        // timeData에 값이 없으면, place에 있는 startTime/endTime을 fallback으로 사용
        const startTime = timeData[place.placeId]?.startTime || place.startTime || "";
        const endTime = timeData[place.placeId]?.endTime || place.endTime || "";
        const hasTimeInput = startTime && endTime;

        const duration = hasTimeInput
          ? computeDuration(startTime, endTime)
          : null;
        const hasDuration = duration !== null;

        return (
          <div key={place.placeId} className="selected-place">
            <span className="index">{index + 1}</span>
            <SelectedPlacesContent hasDuration={hasDuration}>
              <p className="place">{place.scheduleName}</p>
              <span className="btns">
                <button onClick={() => handleTimeInputToggle(place.placeId)}>
                  {hasTimeInput ? (
                    <span className="duration-text">{duration}</span>
                  ) : (
                    <img src={clock} alt="clock icon" className="w-6 h-6" />
                  )}
                </button>
                <button onClick={() => onDeletePlace(place.placeId)}>
                  <img src={trashCan} alt="trashCan icon" className="w-6 h-6" />
                </button>
              </span>

              {/* 시간 입력 폼 */}
              {showTimeInput === place.placeId && (
                <div className="time-input">
                  <div className="time-input-fields">
                    <input
                      type="time"
                      value={timeData[place.placeId]?.startTime || place.startTime || ""}
                      onChange={(e) =>
                        handleTimeChange(place.placeId, "startTime", e.target.value)
                      }
                    />
                    <input
                      type="time"
                      value={timeData[place.placeId]?.endTime || place.endTime || ""}
                      onChange={(e) =>
                        handleTimeChange(place.placeId, "endTime", e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn"
                    onClick={() => handleSaveTime(place.placeId, place.dayNumber)}
                  >
                    완료
                  </button>
                </div>
              )}
            </SelectedPlacesContent>
          </div>
        );
      })}
    </SelectedPlacesContainer>
  );
};

export default Schedule;
