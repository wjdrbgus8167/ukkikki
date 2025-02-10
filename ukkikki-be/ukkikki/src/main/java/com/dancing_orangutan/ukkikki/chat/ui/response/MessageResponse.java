package com.dancing_orangutan.ukkikki.chat.ui.response;

import lombok.Builder;

public record MessageResponse(Integer travelPlanId, String memberName, String content) {


	@Builder
	public MessageResponse{

	}
}
