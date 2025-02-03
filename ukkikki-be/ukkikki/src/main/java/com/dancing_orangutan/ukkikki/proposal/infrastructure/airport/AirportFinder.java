package com.dancing_orangutan.ukkikki.proposal.infrastructure.airport;

import com.dancing_orangutan.ukkikki.entity.info.Airport;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AirportFinder {

    private final JpaAirportRepository jpaAirportRepository;

    public Airport getReferenceById(String airportCode) {
        return jpaAirportRepository.getReferenceById(airportCode);
    }
}
