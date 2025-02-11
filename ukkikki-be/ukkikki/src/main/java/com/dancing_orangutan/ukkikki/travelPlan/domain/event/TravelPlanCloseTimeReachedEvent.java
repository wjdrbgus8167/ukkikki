package com.dancing_orangutan.ukkikki.travelPlan.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

public record TravelPlanCloseTimeReachedEvent(Integer travelPlanId) implements Event {

    @Builder
    public TravelPlanCloseTimeReachedEvent {

    }
}
