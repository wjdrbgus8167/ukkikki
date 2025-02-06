package com.dancing_orangutan.ukkikki.geography.infrastructure;

import com.dancing_orangutan.ukkikki.geography.domain.CountryEntity;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaCountryRepository extends JpaRepository<CountryEntity, Integer> {

	List<CountryEntity> findByContinentEntity_ContinentId(Integer continentID);
}
