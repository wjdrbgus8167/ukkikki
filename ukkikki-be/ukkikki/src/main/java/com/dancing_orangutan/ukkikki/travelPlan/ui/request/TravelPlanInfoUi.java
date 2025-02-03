package com.dancing_orangutan.ukkikki.travelPlan.ui.request;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;

import java.time.LocalDate;
import java.util.List;

public record TravelPlanInfoUi(
        String name,
        Integer departureCityId,
        Integer arrivalCityId,
        LocalDate startDate,
        LocalDate endDate,
        int minPeople,
        int maxPeople,
        PlanningStatus planningStatus,
        List<KeywordUi> keywords
) {
}