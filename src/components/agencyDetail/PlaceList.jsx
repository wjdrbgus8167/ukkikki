import React, { useContext } from "react";
import ProposalDetailContext from "../../contexts/ProposalDetailContext";
import {
  PlaceContainer,
  PlaceCard,
  PlaceName,
  LikeCount,
  PlaceTag,
  NoTagsMessage,
  TagContainer
} from './style/PlaceListStyle'; // 스타일 컴포넌트 import

const PlaceList = () => {
  const { proposal } = useContext(ProposalDetailContext);

  // proposal이 없거나 proposal.data가 없을 경우 처리
  if (!proposal || !proposal.data || !proposal.data.travelPlan) {
    return <div>장소를 불러오지 못했습니다.</div>;
  }

  const { places } = proposal.data.travelPlan;
  
  // places가 없다면 '장소가 없습니다.' 메시지 표시
  if (!places || places.length === 0) {
    return <div>장소가 없습니다.</div>;
  };

  return (
    <PlaceContainer>
      {places.map((place, idx) => {
        return (
          <PlaceCard key={idx}>
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
