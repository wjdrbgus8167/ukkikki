package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.UpdatePlanningStatusService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateTravelPlanStatusCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdatePlanningStatusServiceImpl implements UpdatePlanningStatusService {

	private final TravelPlanRepository travelPlanRepository;

	@Override
	@Transactional
	public void updatePlanningStatus(final UpdateTravelPlanStatusCommand command) {
		TravelPlanEntity entity = travelPlanRepository.findById(command.travelPlanId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.TRAVEL_PLAN_NOT_FOUND));
		entity.updatePlanningStatus(command.status());
	}
}
