package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.List;

public record SearchTravelPlanResponse(@JsonProperty("travelPlans") List<SearchTravelPlanInfo> travelPlans) {

	public record SearchTravelPlanInfo(
			Integer travelPlanId,
			String name,
			Integer departureCityId,
			Integer arrivalCityId,
			LocalDate startDate,
			LocalDate endDate,
			int curPeople,
			int maxPeople,
			PlanningStatus planningStatus,
			List<KeywordUi> keywords
	) {
	}
}
