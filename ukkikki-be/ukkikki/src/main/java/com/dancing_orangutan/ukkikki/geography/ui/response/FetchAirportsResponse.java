package com.dancing_orangutan.ukkikki.geography.ui.response;

import lombok.Builder;

public record FetchAirportsResponse(String airportCode, String name) {

	@Builder
	public FetchAirportsResponse{

	}
}
