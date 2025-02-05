package com.dancing_orangutan.ukkikki.proposal.infrastructure.memberTravelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan.JpaMemberTravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("inquiryMemberTravelPlanFinder")
@RequiredArgsConstructor
public class MemberTravelPlanFinder {

    private final JpaMemberTravelPlanRepository jpamemberTravelPlanRepository;

    public boolean isJoiningTravelPlan(Integer memberId, Integer travelPlanId) {
        return jpamemberTravelPlanRepository.existsByMember_MemberIdAndTravelPlan_TravelPlanId(memberId, travelPlanId);
    }

    public MemberTravelPlanEntity findByTravelPlanIdAndMemberId(Integer travelPlanId, Integer memberId) {
       return jpamemberTravelPlanRepository.findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(memberId,travelPlanId);
    }
}
