package com.dancing_orangutan.ukkikki.travelPlan.application.impl;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.UpdateCloseTimeService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateCloseTimeCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCloseTimeChangedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanSubmittedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UpdateCloseTimeServiceImpl implements UpdateCloseTimeService {

	private final TravelPlanRepository travelPlanRepository;
	private final SpringEventPublisher eventPublisher;

	@Override
	@Transactional
	public void updateCloseTIme(final UpdateCloseTimeCommand command) {
		TravelPlanEntity entity = travelPlanRepository.findById(command.travelPlanId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.TRAVEL_PLAN_NOT_FOUND));

		TravelPlanCloseTimeChangedEvent event = entity.updateCloseTime(
				command.closeTime(), command.memberId());

		TravelPlanSubmittedEvent submittedEvent = TravelPlanSubmittedEvent.builder()
				.travelPlanId(command.travelPlanId())
				.closeTime(command.closeTime())
				.build();

		eventPublisher.publish(event);
		eventPublisher.publish(submittedEvent);
	}
}
