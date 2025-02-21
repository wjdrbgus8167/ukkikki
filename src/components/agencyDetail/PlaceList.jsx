import React, { useContext } from "react";
import TravelPlanDetailContext from "../../contexts/TravelPlanDetailContext";
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
  const { proposal } = useContext(TravelPlanDetailContext);

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

  return (
    <PlaceContainer>
      {sortedPlaces.map((place, idx) => {

        const visibleTags = place.tags && place.tags.length > 5 ? place.tags.slice(0, 5) : place.tags;
        const showMoreText = place.tags && place.tags.length > 5; 
        
        return (
          <PlaceCard key={idx} onClick={() => { handlePlaceClick(place) }}>
            <PlaceName>{place.name}</PlaceName>
            <LikeCount>👍 {place.likeCount}</LikeCount>

            {/* 태그들이 수평으로 나열되도록 */}
            <TagContainer>
              {visibleTags && visibleTags.length > 0 ? (
                visibleTags.map((tag, index) => (
                  <PlaceTag key={index}>
                    # {tag.name}
                  </PlaceTag>
                ))
              ) : (
                <NoTagsMessage>태그가 없습니다.</NoTagsMessage>
              )}
              {showMoreText && (
                <PlaceTag>
                  # 더보기...
                </PlaceTag>
              )}
            </TagContainer>
          </PlaceCard>
        );
      })}
    </PlaceContainer>
  );
};

export default PlaceList;
