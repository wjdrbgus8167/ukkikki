package com.dancing_orangutan.ukkikki.geography.application.query;

import com.dancing_orangutan.ukkikki.geography.domain.airport.Airport;
import lombok.Builder;

public record FetchAirportsQuery(String airportCode, Integer cityId) {

	@Builder
	public FetchAirportsQuery{

	}

	public Airport queryToDomain() {
		return Airport.builder()
				.airportCode(airportCode)
				.cityId(cityId)
				.build();
	}
}
