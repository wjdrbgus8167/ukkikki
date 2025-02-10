package com.dancing_orangutan.ukkikki.chat.ui.response;

import lombok.Builder;

public record EnterMessageResponse(String content, String memberName, Integer travelPlanId) {


	@Builder
	public EnterMessageResponse{

	}
}
