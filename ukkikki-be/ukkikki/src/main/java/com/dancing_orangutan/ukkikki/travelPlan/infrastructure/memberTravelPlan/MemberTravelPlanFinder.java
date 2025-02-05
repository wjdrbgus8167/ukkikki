package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Component
@RequiredArgsConstructor
public class MemberTravelPlanFinder {

    private final JpaMemberTravelPlanRepository repository;

    public boolean isJoiningTravelPlan(Integer memberId, Integer travelPlanId) {
        return repository.existsByMember_MemberIdAndTravelPlan_TravelPlanId(memberId, travelPlanId);
    }
}
