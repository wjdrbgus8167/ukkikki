package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCloseTimeReachedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.JpaTravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class SubmitTravelPlanService {

	private final JpaTravelPlanRepository jpaTravelPlanRepository;

	@EventListener
	@Transactional
	public void submitTravelPlan(TravelPlanCloseTimeReachedEvent event) {
		TravelPlanEntity entity = jpaTravelPlanRepository.findById(event.travelPlanId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.TRAVEL_PLAN_NOT_FOUND));
		entity.submitPlan();
	}
}
