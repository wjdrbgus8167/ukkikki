//api 완성되면 하는 걸로...^^
// 사용자들의 원하는 장소를 마커로 띄우는 것것

import React, { useState, useEffect } from 'react';
import Map from '../../services/Map';
import { LoadScript } from '@react-google-maps/api';
import ProposalDetailContext from '../../contexts/proposalDetailContext';

const TravelPlanMap = () => {
  const [travelPlan, setTravelPlan] = useState(null);

  useEffect(() => {
    setTravelPlan({
      coordinates: { lat: 48.858844, lng: 2.294351 }, // 예시로 에펠탑 좌표
    });
  }, []);

  const coordinates = travelPlan
    ? travelPlan.coordinates
    : { lat: 37.5665, lng: 126.978 };

  return <Map coordinates={coordinates} />;
};
export default TravelPlanMap;
