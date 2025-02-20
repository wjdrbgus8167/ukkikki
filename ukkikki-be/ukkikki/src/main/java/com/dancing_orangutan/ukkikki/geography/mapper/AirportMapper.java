package com.dancing_orangutan.ukkikki.geography.mapper;

import com.dancing_orangutan.ukkikki.geography.domain.airport.Airport;
import com.dancing_orangutan.ukkikki.geography.domain.airport.AirportEntity;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchAirportsResponse;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class AirportMapper {

	public Airport entityToDomain(AirportEntity entity) {
		return Airport.builder()
				.airportCode(entity.getAirportCode())
				.airportName(entity.getAirportName())
				.build();
	}

	public List<FetchAirportsResponse> domainsToResponse(List<Airport> airports) {
		return airports.stream()
				.map(airport -> FetchAirportsResponse.builder()
						.name(airport.airportName())
						.airportCode(airport.airportCode())
						.build()
				).toList();
	}
}
