package com.dancing_orangutan.ukkikki.chat.ui.request;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import lombok.Builder;

public record MessageRequest(Integer travelPlanId, String content) {

	@Builder
	public MessageRequest{

	}

	public SaveMessageCommand toDomain(String email) {
		return SaveMessageCommand.builder()
				.content(content)
				.email(email)
				.travelPlanId(travelPlanId)
				.build();
	}
}
