package com.dancing_orangutan.ukkikki.travelPlan.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import java.time.LocalDateTime;
import lombok.Builder;

public record TravelPlanCloseTimeChangedEvent(Integer travelPlanId, LocalDateTime closeTime) implements
		Event {

	@Builder
	public TravelPlanCloseTimeChangedEvent{

	}
}
