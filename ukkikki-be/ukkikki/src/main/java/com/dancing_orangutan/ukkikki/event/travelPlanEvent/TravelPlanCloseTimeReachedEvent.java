package com.dancing_orangutan.ukkikki.event.travelPlanEvent;

import lombok.Builder;

public record TravelPlanCloseTimeReachedEvent(Integer travelPlanId) {


    @Builder
    public TravelPlanCloseTimeReachedEvent{

    }
}
