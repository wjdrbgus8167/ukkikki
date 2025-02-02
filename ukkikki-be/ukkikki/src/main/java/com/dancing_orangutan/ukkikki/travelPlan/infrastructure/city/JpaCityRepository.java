package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCityRepository extends JpaRepository<CityEntity, Integer> {

}
