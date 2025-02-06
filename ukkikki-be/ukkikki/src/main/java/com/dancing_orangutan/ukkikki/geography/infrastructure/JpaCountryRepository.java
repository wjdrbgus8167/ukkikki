package com.dancing_orangutan.ukkikki.geography.infrastructure;

import com.dancing_orangutan.ukkikki.entity.info.CountryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaCountryRepository extends JpaRepository<CountryEntity,Integer> {

    List<CountryEntity> findByContinentEntity_ContinentId(Integer continentID);
}
