import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import Swal from 'sweetalert2';
import {
  PlaceContainer,
  PlaceCard,
  PlaceName,
  LikeCount,
  PlaceTag,
  NoTagsMessage,
  TagContainer
} from './style/PlaceListStyle'; 


const PlaceList = ({ handlePlaceClick }) => {
  const { proposal } = useContext(ProposalDetailContext);

  if (!proposal || !proposal.data || !proposal.data.travelPlan) {
    return <div>장소를 불러오지 못했습니다.</div>;
  }

  const { places } = proposal.data.travelPlan;
  
  // places가 없다면 '장소가 없습니다.' 메시지 표시
  if (!places || places.length === 0) {
    return <div>장소가 없습니다.</div>;
  };

  // likeCount를 기준으로 내림차순으로 정렬
  const sortedPlaces = places.sort((a, b) => b.likeCount - a.likeCount);

  // 장소에 대한 디테일 모달창
  const handleMouseEnter = (place) => {
    Swal.fire({
      title: place.name,
      text: `👍 ${place.likeCount} Likes`,
      html: `
        <p>${place.description || "No description available"}</p>
        ${place.tags && place.tags.length > 0 ? place.tags.map(tag => `<span>#${tag.name} </span>`).join("") : "<span>No tags available</span>"}
      `,
      showCloseButton: true,
      showConfirmButton: false,
      focusConfirm: false,
      width: "400px",
      background: "#f9f9f9",
      padding: "20px",
      customClass: {
        popup: 'popup-style',
      },
    });
  };

  return (
    <PlaceContainer>
      {sortedPlaces.map((place, idx) => {
        return (
          <PlaceCard key={idx} onClick={() => { handlePlaceClick(place) }} onMouseEnter={() => handleMouseEnter(place)}>
            <PlaceName>{place.name}</PlaceName>
            <LikeCount>👍 {place.likeCount}</LikeCount>

            {/* 태그들이 수평으로 나열되도록 */}
            <TagContainer>
              {place.tags && place.tags.length > 0 ? (
                place.tags.map((tag, index) => (
                  <PlaceTag key={index}>
                    # {tag.name}
                  </PlaceTag>
                ))
              ) : (
                <NoTagsMessage>태그가 없습니다.</NoTagsMessage>
              )}
            </TagContainer>
          </PlaceCard>
        );
      })}
    </PlaceContainer>
  );
};

export default PlaceList;
