package com.dancing_orangutan.ukkikki.travelPlan.application.event.handler;

import com.dancing_orangutan.ukkikki.travelPlan.application.JoinTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.SubmitTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.SubmitTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCloseTimeReachedEvent;
import com.dancing_orangutan.ukkikki.travelPlan.domain.event.TravelPlanCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TravelPlanEventHandler {

	private final JoinTravelPlanService joinTravelPlanService;
	private final SubmitTravelPlanService submitTravelPlanService;

	@EventListener
	public void handleTravelPlanCreatedEvent(TravelPlanCreatedEvent event) {
		joinTravelPlanService.joinTravelPlan(JoinTravelPlanCommand.builder()
				.travelPlanId(event.travelPlanId())
				.memberId(event.memberId())
				.adultCount(event.adultCount())
				.infantCount(event.infantCount())
				.childCount(event.childCount())
				.hostYn(true)
				.build());
	}

	@EventListener
	public void handleTravelPlanCloseTimeReachedEvent(TravelPlanCloseTimeReachedEvent event) {
		submitTravelPlanService.submitTravelPlan(SubmitTravelPlanCommand.builder()
				.travelPlanId(event.travelPlanId())
				.build());
	}
}
