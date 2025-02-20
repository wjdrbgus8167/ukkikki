package com.dancing_orangutan.ukkikki.geography.domain.airport;

import lombok.Builder;

public record Airport(String airportCode, Integer cityId, String airportName) {

	@Builder
	public Airport{

	}
}
