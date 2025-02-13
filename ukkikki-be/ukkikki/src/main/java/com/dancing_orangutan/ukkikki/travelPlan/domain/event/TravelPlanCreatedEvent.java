package com.dancing_orangutan.ukkikki.travelPlan.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

public record TravelPlanCreatedEvent(Integer travelPlanId,Integer memberId, int adultCount, int infantCount, int childCount) implements
		Event {


	@Builder
	public TravelPlanCreatedEvent{

	}
}
