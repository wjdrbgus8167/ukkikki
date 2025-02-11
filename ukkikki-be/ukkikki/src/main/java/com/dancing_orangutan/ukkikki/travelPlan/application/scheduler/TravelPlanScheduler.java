package com.dancing_orangutan.ukkikki.travelPlan.application.scheduler;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCloseTimeChangedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.application.scheduler.task.TravelPlanExpirationTask;
import java.time.Instant;
import java.time.ZoneId;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class TravelPlanScheduler {

	private final TaskScheduler scheduler;
	private final SpringEventPublisher springEventPublisher;

	public TravelPlanScheduler(@Qualifier("threadPoolTaskScheduler") TaskScheduler scheduler,
			SpringEventPublisher springEventPublisher) {
		this.scheduler = scheduler;
		this.springEventPublisher = springEventPublisher;
	}

	@EventListener
	public void expireTravelPlan(TravelPlanCloseTimeChangedEvent event) {
		Instant expirationInstant = event.closeTime().atZone(ZoneId.systemDefault()).toInstant();
		Runnable expirationTask = TravelPlanExpirationTask.builder()
				.travelPlanId(event.travelPlanId())
				.eventPublisher(springEventPublisher)
				.build();

		scheduler.schedule(expirationTask, expirationInstant);
	}
}
