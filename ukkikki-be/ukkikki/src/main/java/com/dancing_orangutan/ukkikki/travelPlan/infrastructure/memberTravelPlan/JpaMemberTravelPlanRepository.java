package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.memberTravelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;


@Component
public interface JpaMemberTravelPlanRepository extends JpaRepository<MemberTravelPlanEntity, MemberTravelPlanId> {

    boolean existsByMember_MemberIdAndTravelPlan_TravelPlanId(Integer memberId, Integer travelPlanId);

    MemberTravelPlanEntity findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(Integer memberId, Integer travelPlanId);
}
