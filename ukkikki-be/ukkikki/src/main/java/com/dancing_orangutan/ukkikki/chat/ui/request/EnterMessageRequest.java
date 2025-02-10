package com.dancing_orangutan.ukkikki.chat.ui.request;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import lombok.Builder;

public record EnterMessageRequest(Integer travelPlanId, Integer memberId) {


	@Builder
	public EnterMessageRequest{

	}

	public SaveMessageCommand toCommand() {
		return SaveMessageCommand.builder()
				.memberId(memberId)
				.travelPlanId(travelPlanId)
				.build();
	}
}
