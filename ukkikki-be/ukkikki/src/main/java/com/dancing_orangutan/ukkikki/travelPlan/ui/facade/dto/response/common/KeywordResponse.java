package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;

import lombok.Builder;

public record KeywordResponse(Integer keywordId, String name) {


	@Builder
	public KeywordResponse {

	}
}