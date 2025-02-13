package com.dancing_orangutan.ukkikki.travelPlan.domain.scheduler.task;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCloseTimeReachedEvent;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class TravelPlanExpirationTask implements Runnable {

	private final Integer travelPlanId;
	private final SpringEventPublisher eventPublisher;

	@Builder
	public TravelPlanExpirationTask(Integer travelPlanId, SpringEventPublisher eventPublisher) {
		this.eventPublisher = eventPublisher;
		this.travelPlanId = travelPlanId;
	}

	@Override
	public void run() {
		eventPublisher.publish(TravelPlanCloseTimeReachedEvent.builder().travelPlanId(travelPlanId).build());
	}
}
