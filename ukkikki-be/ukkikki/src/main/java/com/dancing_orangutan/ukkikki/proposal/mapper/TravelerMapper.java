package com.dancing_orangutan.ukkikki.proposal.mapper;


import com.dancing_orangutan.ukkikki.proposal.domain.traveler.Traveler;
import com.dancing_orangutan.ukkikki.proposal.domain.traveler.TravelerEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.mapstruct.Mapping;
@Mapper(componentModel = "spring")
public interface TravelerMapper {

    TravelerMapper INSTANCE = Mappers.getMapper(TravelerMapper.class);

    // 🔹 Entity → Domain 변환 (연관 엔티티에서 ID 값 추출)
    @Mapping(source = "proposal.proposalId", target = "proposalId")
    @Mapping(source = "memberTravelPlan.memberTravelPlanId.memberId", target = "memberId")
    @Mapping(source = "memberTravelPlan.memberTravelPlanId.travelPlanId", target = "travelPlanId")
    Traveler entityToDomain(TravelerEntity entity);

    TravelerEntity domainToEntity(Traveler domain);
}
