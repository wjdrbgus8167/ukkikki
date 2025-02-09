package com.dancing_orangutan.ukkikki.chat.ui.request;

import com.dancing_orangutan.ukkikki.chat.application.command.SaveMessageCommand;
import lombok.Builder;

public record MessageRequest(Integer travelPlanId, Integer memberId, String content) {


	@Builder
	public MessageRequest{

	}

	public SaveMessageCommand toDomain() {
		return SaveMessageCommand.builder()
				.content(content)
				.memberId(memberId)
				.travelPlanId(travelPlanId)
				.build();
	}
}
