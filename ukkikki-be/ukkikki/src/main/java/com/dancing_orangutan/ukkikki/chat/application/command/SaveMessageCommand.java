package com.dancing_orangutan.ukkikki.chat.application.command;

import com.dancing_orangutan.ukkikki.chat.domain.Message;
import lombok.Builder;

public record SaveMessageCommand(Integer memberId, Integer travelPlanId, String content) {


	@Builder
	public SaveMessageCommand{

	}

	public Message toDomain() {
		return Message.builder()
				.travelPlanId(travelPlanId)
				.content(content)
				.memberId(memberId)
				.build();
	}
}
