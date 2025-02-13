// 날짜별 일정 구성

import React, { useContext } from "react";
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

const ScheduleByDate = ({onTogglePlaceSelection, selectedPlaces=[], onDeletePlace }) => {
    
    const { proposal } = useContext(ProposalDetailContext);
    if(!proposal) {
        return <div>로딩중</div>
    }
    const { arrivalCity, startDate, endDate } = proposal.data.travelPlan;

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
                        <div key={place.id} className="selected-place">
                            <span className="index">{index+1}</span>
                            <SelectedPlacesContent>
                                <p className="place">{place.name}</p>
                                <span className="btns">
                                    <button>
                                        <img src={clock} alt="clock icon" className="w-6 h-6" />
                                    </button>
                                    <button onClick={() => {onDeletePlace(place.placeId)}}>
                                        <img src={trashCan} alt="trashCan icon" className="w-6 h-6" />
                                    </button>
                                </span>
                                
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