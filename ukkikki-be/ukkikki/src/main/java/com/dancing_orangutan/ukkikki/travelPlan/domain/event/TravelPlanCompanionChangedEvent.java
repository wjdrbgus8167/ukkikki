package com.dancing_orangutan.ukkikki.travelPlan.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

public record TravelPlanCompanionChangedEvent(Integer travelPlanId, Integer memberId,
                                              int adultCount, int childCount,
                                              int infantCount) implements Event {

    @Builder
    public TravelPlanCompanionChangedEvent {

    }
}
