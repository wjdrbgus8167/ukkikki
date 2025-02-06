package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InquiryMapper {

    InquiryMapper INSTANCE = Mappers.getMapper(InquiryMapper.class);

    @Mapping(target = "memberTravelPlan.memberTravelPlanId.travelPlanId", source = "travelPlanId")
    @Mapping(target = "memberTravelPlan.memberTravelPlanId.memberId", source = "memberId")
    @Mapping(target = "proposal.proposalId", source = "proposalId")
    InquiryEntity domainToEntity(Inquiry inquiry);

    Inquiry entityToDomain(InquiryEntity entity);

}