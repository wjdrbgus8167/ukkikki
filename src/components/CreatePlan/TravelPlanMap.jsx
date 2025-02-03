//api 완성되면 하는 걸로...^^
// 사용자들의 원하는 장소를 마커로 띄우는 것것

import React, { useContext } from "react";
import Map from "../../services/Map";
import ProposalDetailContext from "../../contexts/proposalDetailContext";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const TravelPlanMap = () => {
    const { travelPlan } = useContext(ProposalDetailContext);
    const places = travelPlan ? travelPlan.places :[];

    return (
        <Map places={places} apikey={apiKey}/>
    )
};
export default TravelPlanMap;