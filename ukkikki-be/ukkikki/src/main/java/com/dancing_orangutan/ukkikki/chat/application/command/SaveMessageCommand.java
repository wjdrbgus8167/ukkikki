package com.dancing_orangutan.ukkikki.chat.application.command;

import lombok.Builder;

public record SaveMessageCommand(String email, Integer travelPlanId, String content) {


	@Builder
	public SaveMessageCommand{

	}
}
