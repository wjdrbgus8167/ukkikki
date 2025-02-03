package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.TravelPlanInfoUi;


import java.util.List;
import java.util.stream.Collectors;

public record CreateTravelPlanResponse(TravelPlanInfoUi travelPlan) {

	public static CreateTravelPlanResponse toResponse(TravelPlan travelPlan) {
		if (travelPlan == null) {
			return null;
		}
		TravelPlanInfoUi travelPlanInfoUi = new TravelPlanInfoUi(
				travelPlan.getTravelPlanInfo().name(),
				travelPlan.getTravelPlanInfo().departureCityId(),
				travelPlan.getTravelPlanInfo().arrivalCityId(),
				travelPlan.getTravelPlanInfo().startDate(),
				travelPlan.getTravelPlanInfo().endDate(),
				travelPlan.getTravelPlanInfo().minPeople(),
				travelPlan.getTravelPlanInfo().maxPeople(),
				travelPlan.getTravelPlanInfo().planningStatus(),
				mapKeywords(travelPlan.getKeywords())
		);

		return new CreateTravelPlanResponse(travelPlanInfoUi);
	}

	private static List<KeywordUi> mapKeywords(List<Integer> keywordIds) {
		if (keywordIds == null) {
			return null;
		}
		return keywordIds.stream().map(KeywordUi::new).collect(Collectors.toList());
	}
}
