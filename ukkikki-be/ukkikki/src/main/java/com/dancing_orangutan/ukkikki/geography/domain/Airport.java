package com.dancing_orangutan.ukkikki.geography.domain;

import lombok.Builder;

public record Airport(String airportCode, Integer cityId, String airportName) {

	@Builder
	public Airport{

	}
}
