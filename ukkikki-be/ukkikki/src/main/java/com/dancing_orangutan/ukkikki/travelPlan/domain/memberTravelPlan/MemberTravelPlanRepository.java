package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan;

import java.util.Optional;

public interface MemberTravelPlanRepository {

	Optional<MemberTravelPlanEntity> findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(
			Integer memberId, Integer travelPlanId);


	boolean existsByMember_MemberIdAndTravelPlan_TravelPlanId(Integer memberId,
			Integer travelPlanId);


	void store(MemberTravelPlanEntity entity);
}
