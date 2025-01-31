package com.dancing_orangutan.ukkikki.travelPlan.infrastructure;

import com.dancing_orangutan.ukkikki.entity.info.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCityRepository extends JpaRepository<City, Integer> {

}
