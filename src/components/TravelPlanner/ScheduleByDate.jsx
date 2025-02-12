// 날짜별 일정 구성

import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import { 
    Info, 
    ScheduleByDateContainer,
    ScheduleContainer,
} from "./style/ScheduleByDateStyle";

const ScheduleByDate = ({onTogglePlaceSelection}) => {
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
            <ScheduleContainer>
                <button onClick={onTogglePlaceSelection}>
                    장소 추가
                </button>
            </ScheduleContainer>

        </ScheduleByDateContainer>
    );
};

export default ScheduleByDate;