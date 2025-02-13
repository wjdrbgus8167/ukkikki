package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.ExitTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.ExitTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanRepository;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ExitTravelPlanServiceImpl implements ExitTravelPlanService {

	private final MemberTravelPlanRepository memberTravelPlanRepository;
	private final TravelPlanRepository travelPlanRepository;

	@Override
	public void exitTravelPlan(ExitTravelPlanCommand command) {
		MemberTravelPlanEntity entity = memberTravelPlanRepository.findMemberTravelPlanEntityByMember_MemberIdAndTravelPlan_TravelPlanId(
				command.memberId(), command.travelPlanId()).orElseThrow(() -> new ApiException(
				ErrorCode.MEMBER_TRAVEL_PLAN_NOT_FOUND));

		if (entity.isHost()) {
			travelPlanRepository.deleteById(command.travelPlanId());
		} else {
			entity.exit();
		}
	}
}
