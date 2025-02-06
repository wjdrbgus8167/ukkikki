package com.dancing_orangutan.ukkikki.geography.infrastructure;


import com.dancing_orangutan.ukkikki.entity.info.ContinentEntity;
import com.dancing_orangutan.ukkikki.entity.info.CountryEntity;
import com.dancing_orangutan.ukkikki.geography.domain.Continent;
import com.dancing_orangutan.ukkikki.geography.domain.Country;
import com.dancing_orangutan.ukkikki.geography.mapper.ContinentMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.CountryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GeographyRepository {

    private final JpaContinentRepository jpaContinentRepository;
    private final JpaCountryRepository jpaCountryRepository;
    private final ContinentMapper continentMapper;
    private final CountryMapper countryMapper;

    public List<Continent> getContinents() {
        List<ContinentEntity> continentEntities = jpaContinentRepository.findAll();
        return continentMapper.entitiesToDomains(continentEntities);
    }

    public List<Country> getCountries(final Country country) {
        List<CountryEntity> countryEntities = jpaCountryRepository.findByContinentEntity_ContinentId(country.continentId());
        return countryMapper.entitiesToDomains(countryEntities);
    }
}
