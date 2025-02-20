package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateCloseTimeCommand;
import java.time.LocalDateTime;

public record UpdateCloseTimeRequest(LocalDateTime closeTime) {

	public UpdateCloseTimeCommand toCommand(Integer memberId,Integer travelPlanId) {
		return UpdateCloseTimeCommand.builder()
				.travelPlanId(travelPlanId)
				.memberId(memberId)
				.closeTime(closeTime)
				.build();
	}

}
