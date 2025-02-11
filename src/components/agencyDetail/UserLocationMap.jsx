import React, { useContext } from "react";
import { LoadScript } from "@react-google-maps/api";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import PlaceMap from "../../services/map/PlaceMap";
import { MapContainer } from "./style/UserLocationMap";

const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserLocationMap = () => {
  const { proposal } = useContext(ProposalDetailContext);

  if (!proposal || !proposal.data || !proposal.data.travelPlan) {
    return <div>데이터 불러오기 실패</div>;
  }

  const { travelPlanId, places } = proposal.data.travelPlan;
  console.log("Travel Plan ID:", travelPlanId);

  const centerCoordinates =
    Array.isArray(places) && places.length > 0
      ? { lat: places[0].latitude, lng: places[0].longitude }
      : { lat: 37.5665, lng: 126.9780 };

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <PlaceMap
          coordinates={centerCoordinates}
          markers={places}
        />
      </LoadScript>
    </MapContainer>
  );
};

export default UserLocationMap;
