package com.dancing_orangutan.ukkikki.chat.ui.response;

import lombok.Builder;

public record MessageResponse(Integer travelPlanId, Integer memberId, String memberName, String content, String profileImageUrl) {


	@Builder
	public MessageResponse{

	}
}
