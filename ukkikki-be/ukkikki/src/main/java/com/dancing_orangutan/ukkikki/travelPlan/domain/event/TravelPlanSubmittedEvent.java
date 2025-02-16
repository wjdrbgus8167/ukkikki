package com.dancing_orangutan.ukkikki.travelPlan.domain.event;

import java.time.LocalDateTime;

public record TravelPlanSubmittedEvent(Integer travelPlanId, LocalDateTime closeTime) {

}
