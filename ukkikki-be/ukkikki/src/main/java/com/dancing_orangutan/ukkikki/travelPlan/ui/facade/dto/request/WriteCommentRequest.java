package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.WriteCommentCommand;

public record WriteCommentRequest(String hostComment) {


	public WriteCommentCommand toCommand(final Integer memberId, final Integer travelPlanId) {
		return WriteCommentCommand.builder()
				.travelPlanId(travelPlanId)
				.memberId(memberId)
				.hostComment(hostComment)
				.build();
	}
}
