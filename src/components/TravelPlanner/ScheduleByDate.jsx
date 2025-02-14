// 날짜별 일정 구성

import React, { useContext, useState } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { 
    Info, 
    ScheduleByDateContainer,
    ScheduleContainer,
    SelectedPlacesContainer,
    SelectedPlacesContent,
} from "./style/ScheduleByDateStyle";
import clock from  '../../assets/clock.png'; 
import trashCan from '../../assets/trash_can.png'; 

const ScheduleByDate = ({onTogglePlaceSelection, selectedPlaces=[], onDeletePlace, onAddTime }) => {
    const [timeData, setTimeData] = useState({});
    const [showTimeInput, setShowTimeInput] = useState(null);
    const { proposal } = useContext(ProposalDetailContext);
    if(!proposal) {
        return <div>로딩중</div>
    }
    const { arrivalCity, startDate, endDate } = proposal.data.travelPlan;

    const handleSaveTime = (placeId) => {
        onAddTime(placeId, timeData[placeId]?.startTime, timeData[placeId]?.endTime);
        setShowTimeInput(null);
    };

    const handleTimeInputToggle = (placeId) => {
        setShowTimeInput(showTimeInput ===placeId ? null: placeId)
    };

    const handleTimeChange = (placeId, type, value) => {
        setTimeData((prevData) => ({
            ...prevData,
            [placeId]: {
                ...prevData[placeId],
                [type]: value,
            },
        }));
    };
    return (
        <ScheduleByDateContainer>
            <Info>
                <h1> {arrivalCity.name}</h1>
                <h3>
                {startDate} ~ {endDate}
                </h3>
            </Info>

            {/* 선택된 장소들을 표시하는 영역 */}
            {selectedPlaces.length > 0 && (
                <SelectedPlacesContainer>
                    {selectedPlaces.map((place, index) => (
                        <div key={place.placeId} className="selected-place">
                            <span className="index">{index+1}</span>
                            <SelectedPlacesContent>
                                <p className="place">{place.name}</p>
                                <span className="btns">
                                    <button onClick={()=> handleTimeInputToggle(place.placeId)}>
                                        <img src={clock} alt="clock icon" className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => {onDeletePlace(place.placeId)}}>
                                        <img src={trashCan} alt="trashCan icon" className="w-6 h-6" />
                                    </button>
                                </span>
                                
                                {/* 시간 입력 폼 */}
                                {showTimeInput === place.placeId && (
                                    <div className="time-input">
                                        <div className="time-input-fields">
                                            <input
                                                type="time"
                                                value={timeData[place.placeId]?.startTime || ""}
                                                onChange={(e) => handleTimeChange(place.placeId, "startTime", e.target.value)}
                                            />
                                            <input
                                                type="time"
                                                value={timeData[place.placeId]?.endTime || ""}
                                                onChange={(e) => handleTimeChange(place.placeId, "endTime", e.target.value)}
                                            />
                                        </div>
                                        <button
                                            className="btn"
                                            onClick={() => handleSaveTime(place.placeId)}>완료</button>
                                    </div>
                                )}
                            </SelectedPlacesContent>
                        </div>
                    ))}
                </SelectedPlacesContainer>
            )}
            <ScheduleContainer>
                <button onClick={onTogglePlaceSelection}>
                    장소 추가
                </button>
            </ScheduleContainer>

        </ScheduleByDateContainer>
    );
};

export default ScheduleByDate;