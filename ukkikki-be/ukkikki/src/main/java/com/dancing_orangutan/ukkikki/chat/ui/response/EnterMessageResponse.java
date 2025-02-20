package com.dancing_orangutan.ukkikki.chat.ui.response;

import lombok.Builder;

import java.time.LocalDateTime;

public record EnterMessageResponse(
		Integer travelPlanId,
		Integer memberId,
		String memberName,
		String content,
		String profileImageUrl,
		LocalDateTime createdAt
) {

	@Builder
	public EnterMessageResponse{

	}
}
