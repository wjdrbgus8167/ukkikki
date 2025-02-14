package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.util.List;

public record SearchMyTravelPlanResponse(@JsonProperty("travelPlans") List<TravelPlanResponse> travelPlans) {


	@Builder
	public SearchMyTravelPlanResponse {

	}
}
