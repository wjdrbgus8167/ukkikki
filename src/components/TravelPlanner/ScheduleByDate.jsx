// 날짜별 일정 구성

import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import { 
    Info, 
    ScheduleByDateContainer
} from "./style/ScheduleByDateStyle";

const ScheduleByDate = () => {
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
        </ScheduleByDateContainer>
    );
};

export default ScheduleByDate;