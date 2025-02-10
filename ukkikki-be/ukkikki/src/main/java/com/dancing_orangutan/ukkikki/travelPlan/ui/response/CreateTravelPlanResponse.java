package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.TravelPlanInfoUi;


import java.util.stream.Collectors;

public record CreateTravelPlanResponse(TravelPlanInfoUi travelPlan) {

	public static CreateTravelPlanResponse toResponse(TravelPlan travelPlan) {
		if (travelPlan == null) {
			return null;
		}

		TravelPlanInfoUi travelPlanInfoUi = TravelPlanInfoUi.builder()
				.name(travelPlan.getTravelPlanInfo().name())
				.departureCityId(travelPlan.getTravelPlanInfo().departureCityId())
				.arrivalCityId(travelPlan.getTravelPlanInfo().arrivalCityId())
				.startDate(travelPlan.getTravelPlanInfo().startDate())
				.endDate(travelPlan.getTravelPlanInfo().endDate())
				.maxPeople(travelPlan.getTravelPlanInfo().maxPeople())
				.minPeople(travelPlan.getTravelPlanInfo().minPeople())
				.planningStatus(travelPlan.getTravelPlanInfo().planningStatus())
				.keywords(travelPlan.getTravelPlanInfo().keywords().stream().map(KeywordUi::new)
						.collect(Collectors.toList()))
				.build();

		return new CreateTravelPlanResponse(travelPlanInfoUi);
	}

}
