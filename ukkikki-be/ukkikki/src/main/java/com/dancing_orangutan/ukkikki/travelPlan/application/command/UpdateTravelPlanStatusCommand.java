package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import lombok.Builder;

public record UpdateTravelPlanStatusCommand(PlanningStatus status, Integer travelPlanId) {

	@Builder
	public UpdateTravelPlanStatusCommand{

	}
}
