package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCompanionChangedEvent;
import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.UpdateCompanionCountService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.common.UpdateCompanionCountCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UpdateCompanionCountServiceImpl implements UpdateCompanionCountService {


	private final TravelPlanRepository travelPlanRepository;
	private final SpringEventPublisher eventPublisher;

	@Override
	public void updateCompanionCount(final UpdateCompanionCountCommand command) {
		TravelPlanEntity entity = travelPlanRepository.findById(command.travelPlanId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.TRAVEL_PLAN_NOT_FOUND));

		entity.updateCompanionCount(command.memberId(), command.adultCount(),
				command.childCount(), command.infantCount());

		eventPublisher.publish(TravelPlanCompanionChangedEvent.builder()
				.adultCount(command.adultCount())
				.childCount(command.childCount())
				.infantCount(command.infantCount())
				.memberId(command.memberId())
				.travelPlanId(command.travelPlanId())
				.build());
	}
}
