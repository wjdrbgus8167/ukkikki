package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import lombok.Builder;

public record ExitTravelPlanCommand(Integer memberId, Integer travelPlanId){


	@Builder
	public ExitTravelPlanCommand{

	}
}
