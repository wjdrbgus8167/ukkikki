package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import lombok.Builder;

import java.time.LocalDate;

public record TravelPlanInfo(
        Integer travelPlanId,
        String name,
        Integer departureCityId,
        Integer arrivalCityId,
        LocalDate startDate,
        LocalDate endDate,
        int minPeople,
        int maxPeople,
        PlanningStatus planningStatus,
        String comment
) {

    @Builder
    public TravelPlanInfo {

    }
}
