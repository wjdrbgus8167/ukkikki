package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import lombok.Builder;

public record SubmitTravelPlanCommand(Integer travelPlanId) {

	@Builder
	public SubmitTravelPlanCommand{

	}
}
