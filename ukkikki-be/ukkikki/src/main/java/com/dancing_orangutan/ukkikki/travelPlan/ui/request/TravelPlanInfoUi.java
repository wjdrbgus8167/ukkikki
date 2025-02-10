package com.dancing_orangutan.ukkikki.travelPlan.ui.request;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;

import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

public record TravelPlanInfoUi(
		Integer travelPlanId,
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

	@Builder
	public TravelPlanInfoUi{

	}
}