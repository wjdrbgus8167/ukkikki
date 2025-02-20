package com.dancing_orangutan.ukkikki.chat.ui.response;

import com.dancing_orangutan.ukkikki.chat.Action;
import lombok.Builder;

public record ActionResponse(Integer travelPlanId, String placeName, Action action, String memberName) {

	@Builder
	public ActionResponse{

	}
}
