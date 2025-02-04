package com.dancing_orangutan.ukkikki.proposal.infrastructure.airport;

import com.dancing_orangutan.ukkikki.entity.info.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAirportRepository extends JpaRepository<Airport,String> {
}
