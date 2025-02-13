package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;
import lombok.Builder;

public record FetchSuggestedTravelPlansResponse(@JsonProperty("travelPlans") List<TravelPlanResponse> travelPlans) {

	@Builder
	public FetchSuggestedTravelPlansResponse{

	}
}
