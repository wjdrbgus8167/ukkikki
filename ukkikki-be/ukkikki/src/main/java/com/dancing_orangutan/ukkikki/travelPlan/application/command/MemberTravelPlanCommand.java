package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import lombok.Builder;

public record MemberTravelPlanCommand(Integer memberId, int adultCount, int infantCount, int childCount) {


	@Builder
	public MemberTravelPlanCommand{

	}
}
