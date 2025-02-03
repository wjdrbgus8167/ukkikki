package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class JoinTravelPlanCommand {

	int adultCount;
	int childCount;
	int infantCount;
	Integer travelPlanId;
	Integer memberId;

	@Builder
	public JoinTravelPlanCommand(Integer adultCount, Integer childCount, Integer infantCount,
			Integer travelPlanId, Integer memberId) {
		this.adultCount = adultCount;
		this.childCount = childCount;
		this.infantCount = infantCount;
		this.travelPlanId = travelPlanId;
		this.memberId = memberId;
	}

}
