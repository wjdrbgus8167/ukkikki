package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.SubmitTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.SubmitTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class SubmitTravelPlanServiceImpl implements SubmitTravelPlanService {

	private final TravelPlanRepository travelPlanRepository;

	@Override
	@Transactional
	public void submitTravelPlan(final SubmitTravelPlanCommand command) {
		TravelPlanEntity entity = travelPlanRepository.findById(command.travelPlanId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.TRAVEL_PLAN_NOT_FOUND));
		entity.submitPlan();
	}
}
