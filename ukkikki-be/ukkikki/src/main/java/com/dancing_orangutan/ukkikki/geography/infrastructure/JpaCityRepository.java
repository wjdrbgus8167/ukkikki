package com.dancing_orangutan.ukkikki.geography.infrastructure;

import com.dancing_orangutan.ukkikki.geography.domain.CityEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCityRepository extends JpaRepository<CityEntity, Integer> {

	List<CityEntity> findByCountryEntity_CountryId(Integer countryId);

}
