package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import lombok.Builder;

public record FetchTravelPlanDetailsQueryByMember(Integer memberId, Integer travelPlanId) {

	@Builder
	public FetchTravelPlanDetailsQueryByMember{

	}
}
