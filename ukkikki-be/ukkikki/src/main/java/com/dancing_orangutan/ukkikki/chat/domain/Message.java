package com.dancing_orangutan.ukkikki.chat.domain;

import lombok.Builder;

public record Message(Integer travelPlanId, Integer memberId, String content) {

	@Builder
	public Message{

	}
}
