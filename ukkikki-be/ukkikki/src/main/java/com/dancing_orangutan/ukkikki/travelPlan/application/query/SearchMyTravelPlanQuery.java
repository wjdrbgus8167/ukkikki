package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import lombok.Builder;



public record SearchMyTravelPlanQuery(PlanningStatus status, Integer memberId) {

	@Builder
	public SearchMyTravelPlanQuery {
	}

}
