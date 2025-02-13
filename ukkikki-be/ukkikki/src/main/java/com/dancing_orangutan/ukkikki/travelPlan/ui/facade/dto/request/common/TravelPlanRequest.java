package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.common;

import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import java.time.LocalDate;
import java.util.List;

public record TravelPlanRequest(Integer departureCityId, Integer arrivalCityId, String name,
								LocalDate startDate, LocalDate endDate, int minPeople, int maxPeople, PlanningStatus planningStatus,
								List<KeywordRequest> keywords) {

}
