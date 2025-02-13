package com.dancing_orangutan.ukkikki.geography.infrastructure;

import com.dancing_orangutan.ukkikki.geography.domain.airport.AirportEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaAirportRepository extends JpaRepository<AirportEntity,String> {

	List<AirportEntity> findByCity_CityId(Integer cityId);
}
