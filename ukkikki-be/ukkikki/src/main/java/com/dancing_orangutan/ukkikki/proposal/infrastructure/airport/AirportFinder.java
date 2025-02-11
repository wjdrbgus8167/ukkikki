package com.dancing_orangutan.ukkikki.proposal.infrastructure.airport;

import com.dancing_orangutan.ukkikki.geography.domain.AirportEntity;
import com.dancing_orangutan.ukkikki.geography.infrastructure.JpaAirportRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AirportFinder {

    private final JpaAirportRepository jpaAirportRepository;

    public AirportEntity getReferenceById(String airportCode) {
        return jpaAirportRepository.findById(airportCode)
                .orElseThrow(() -> new EntityNotFoundException("해당 공항을 찾을 수 없습니다."));
    }
}
