package com.dancing_orangutan.ukkikki.chat.ui.request;

import lombok.Builder;

public record EnterMessageRequest(Integer travelPlanId, String email) {


	@Builder
	public EnterMessageRequest{

	}
}
