package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;
import java.util.List;

public record FetchSuggestedTravelPlanResponse (@JsonProperty("travelPlans") List<FetchSuggestedTravelPlanInfo> travelPlans) {

    public record FetchSuggestedTravelPlanInfo(
            Integer travelPlanId,
            String name,
            Integer departureCityId,
            Integer arrivalCityId,
            LocalDate startDate,
            LocalDate endDate,
            int curPeople,
            int minPeople,
            int maxPeople,
            PlanningStatus planningStatus,
            List<KeywordUi> keywords
    ) {
    }
}
