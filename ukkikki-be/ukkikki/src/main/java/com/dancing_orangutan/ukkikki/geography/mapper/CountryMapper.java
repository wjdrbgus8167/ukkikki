package com.dancing_orangutan.ukkikki.geography.mapper;

import com.dancing_orangutan.ukkikki.entity.info.CountryEntity;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCountriesQuery;
import com.dancing_orangutan.ukkikki.geography.domain.Country;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCountriesResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CountryMapper {

    public List<Country> entitiesToDomains(List<CountryEntity> entities) {
        return entities.stream()
                .map(countryEntity -> Country.builder()
                        .name(countryEntity.getName())
                        .countryId(countryEntity.getCountryId())
                        .build())
                .toList();
    }

    public List<FetchCountriesResponse> domainsToResponses(List<Country> entities) {
        return entities.stream()
                .map(domain -> FetchCountriesResponse.builder()
                        .name(domain.name())
                        .countryId(domain.countryId())
                        .build())
                .toList();
    }

    public Country queryToDomain(FetchCountriesQuery query) {
        return Country.builder()
                .continentId(query.continentId())
                .build();
    }
}
