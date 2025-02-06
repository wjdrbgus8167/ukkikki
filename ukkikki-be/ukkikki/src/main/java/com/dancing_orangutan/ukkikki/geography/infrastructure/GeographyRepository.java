package com.dancing_orangutan.ukkikki.geography.infrastructure;


import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.geography.domain.ContinentEntity;
import com.dancing_orangutan.ukkikki.geography.domain.CountryEntity;
import com.dancing_orangutan.ukkikki.geography.domain.City;
import com.dancing_orangutan.ukkikki.geography.domain.Continent;
import com.dancing_orangutan.ukkikki.geography.domain.Country;
import com.dancing_orangutan.ukkikki.geography.mapper.CityMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.ContinentMapper;
import com.dancing_orangutan.ukkikki.geography.mapper.CountryMapper;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city.JpaCityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class GeographyRepository {

    private final JpaContinentRepository jpaContinentRepository;
    private final JpaCountryRepository jpaCountryRepository;
    private final JpaCityRepository jpaCityRepository;
    private final ContinentMapper continentMapper;
    private final CountryMapper countryMapper;
    private final CityMapper cityMapper;

    public List<Continent> getContinents() {
        List<ContinentEntity> continentEntities = jpaContinentRepository.findAll();
        return continentMapper.entitiesToDomains(continentEntities);
    }

    public List<Country> getCountries(final Country country) {
        List<CountryEntity> countryEntities = jpaCountryRepository.findByContinentEntity_ContinentId(country.continentId());
        return countryMapper.entitiesToDomains(countryEntities);
    }

    public List<City> getCities(final City city) {
        List<CityEntity> cityEntities = jpaCityRepository.findByCountryEntity_CountryId(
                city.countryId());
        return cityMapper.entitiesToDomains(cityEntities);
    }
}
