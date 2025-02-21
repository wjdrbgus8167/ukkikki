package com.dancing_orangutan.ukkikki.geography.ui.response;

import lombok.Builder;

public record FetchCitiesResponse(Integer cityId, String name) {

	@Builder
	public FetchCitiesResponse{

	}
}
