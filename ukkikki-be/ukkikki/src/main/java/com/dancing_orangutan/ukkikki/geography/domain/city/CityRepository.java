package com.dancing_orangutan.ukkikki.geography.domain.city;

import java.util.Optional;

public interface CityRepository {

	Optional<CityEntity> findById(Integer cityId);

}
