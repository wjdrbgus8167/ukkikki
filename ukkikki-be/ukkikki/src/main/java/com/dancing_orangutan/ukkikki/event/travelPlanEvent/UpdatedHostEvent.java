package com.dancing_orangutan.ukkikki.event.travelPlanEvent;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

public record UpdatedHostEvent(Integer travelPlanId, Integer memberId, int adultCount, int childCount, int infantCount) implements Event {

    @Builder
    public UpdatedHostEvent {

    }
}
