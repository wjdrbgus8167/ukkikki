package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import lombok.Builder;

public record FetchTravelPlanDetailsQuery(Integer travelPlanId) {

	@Builder
	public FetchTravelPlanDetailsQuery{

	}
}
