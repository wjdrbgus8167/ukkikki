package com.dancing_orangutan.ukkikki.proposal.infrastructure.memberTravelPlan;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("inquiryMemberTravelPlanFinder")
@RequiredArgsConstructor
public class MemberTravelPlanFinder {

	private final MemberTravelPlanRepository jpamemberTravelPlanRepository;

	public boolean isJoiningTravelPlan(Integer memberId, Integer travelPlanId) {
		return jpamemberTravelPlanRepository.existsByMember_MemberIdAndTravelPlan_TravelPlanId(
				memberId, travelPlanId);
	}

	public MemberTravelPlanEntity findByTravelPlanIdAndMemberId(Integer travelPlanId,
			Integer memberId) {

		return jpamemberTravelPlanRepository.findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(
						memberId, travelPlanId)
				.orElseThrow(() -> new ApiException(ErrorCode.MEMBER_TRAVEL_PLAN_NOT_FOUND));
	}
}
