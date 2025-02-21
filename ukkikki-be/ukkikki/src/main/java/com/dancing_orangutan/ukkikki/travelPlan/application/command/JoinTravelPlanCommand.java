package com.dancing_orangutan.ukkikki.travelPlan.application.command;


import lombok.Builder;

public record JoinTravelPlanCommand(int adultCount, int childCount, int infantCount,
									Integer travelPlanId, Integer memberId, boolean hostYn) {

	@Builder
	public JoinTravelPlanCommand {

	}

}
