package com.dancing_orangutan.ukkikki.proposal.infrastructure.airport;

import com.dancing_orangutan.ukkikki.geography.domain.AirportEntity;
import com.dancing_orangutan.ukkikki.geography.infrastructure.JpaAirportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AirportFinder {

    private final JpaAirportRepository jpaAirportRepository;

    public AirportEntity getReferenceById(String airportCode) {
        return jpaAirportRepository.getReferenceById(airportCode);
    }
}
