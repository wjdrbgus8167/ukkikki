import React, { useContext, useEffect, useState } from "react";
import { LoadScript } from "@react-google-maps/api";
import PlaceMap from "../../services/map/PlaceMap";
import { MapContainer } from "./style/UserLocationMap";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import Swal from 'sweetalert2';


const apiKey = import.meta.env.VITE_APP_GOOGLE_API_KEY;

const UserLocationMap = ({ latitude, longitude }) => {
  const { proposal } = useContext(ProposalDetailContext);
  const [centerCoordinates, setCenterCoordinates] = useState({ lat: 37.5665, lng: 126.9780 }); // 서울 기본 좌표 설정
  const [zoomLevel, setZoomLevel] = useState(12);
  const [place, setPlace] = useState([]);

  useEffect(() => {
    if (proposal && proposal.data && proposal.data.travelPlan && proposal.data.travelPlan.places) {
      const places = proposal.data.travelPlan.places;
      setPlace(places)
      // 첫 번째 장소의 위도와 경도로 지도 초기화
      const firstPlace = places[0];
      if (firstPlace) {
        setCenterCoordinates({ lat: firstPlace.latitude, lng: firstPlace.longitude });
        setZoomLevel(16);  // 첫 번째 장소에 맞춰 줌 레벨 설정
      }
    }
  }, [proposal]);  // proposal이 변경될 때마다 실행

  useEffect(() => {
    // 만약 latitude와 longitude가 제공되면 해당 좌표로 지도 설정
    if (latitude && longitude) {
      setCenterCoordinates({ lat: latitude, lng: longitude });
      setZoomLevel(16);  // 장소에 따라 줌 레벨 조정
    }
  }, [latitude, longitude]);

  const handleMarkerClick = (place) => {
    Swal.fire({
      title: place.name,
      text: `👍 ${place.likeCount} Likes`,
      html: `
        <p>${place.description || "No description available"}</p>
        ${place.tags && place.tags.length > 0 ? place.tags.map(tag => `<span>#${tag.name} </span>`).join("") : "<span>No tags available</span>"}
      `,
      showCloseButton: true,
      showConfirmButton: false,
      width: "400px",
      background: "#f9f9f9",
      padding: "20px",
      customClass: {
        popup: 'popup-style',
      },
    });
  }

  if (!centerCoordinates) {
    return <div>지도 로딩 중...</div>;
  }

  return (
    <MapContainer>
      <LoadScript googleMapsApiKey={apiKey} libraries={['places']}>
        <PlaceMap
          coordinates={centerCoordinates}
          markers={place.map(place => ({
            lat: place.latitude,
            lng: place.longitude,
            onClick: () => handleMarkerClick(place),  // 마커 클릭 시 Swal 호출
          }))}  
          zoom={zoomLevel}
        />
      </LoadScript>
    </MapContainer>
  );
};

export default UserLocationMap;
