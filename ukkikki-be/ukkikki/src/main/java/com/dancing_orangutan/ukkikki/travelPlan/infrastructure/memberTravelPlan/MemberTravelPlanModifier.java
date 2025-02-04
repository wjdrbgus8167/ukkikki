package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class MemberTravelPlanModifier {

    private final JpaMemberTravelPlanRepository jpaMemberTravelPlanRepository;

    public void modifyLastJoinTime(Integer memberId, Integer travelPlanId) {
        MemberTravelPlanEntity entity = jpaMemberTravelPlanRepository.findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(memberId, travelPlanId);
        entity.updateLastJoinTime();
    }
}
