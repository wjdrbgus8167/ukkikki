package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.common.UpdateCompanionCountCommand;

public record UpdateCompanionCountRequest(int adultCount, int childCount, int infantCount) {


	public UpdateCompanionCountCommand toCommand(Integer memberId, Integer travelPlanId) {
		return UpdateCompanionCountCommand
				.builder()
				.adultCount(adultCount)
				.childCount(childCount)
				.infantCount(infantCount)
				.memberId(memberId)
				.travelPlanId(travelPlanId)
				.build();
	}

}
