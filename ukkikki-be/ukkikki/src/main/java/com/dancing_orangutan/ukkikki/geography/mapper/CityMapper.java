package com.dancing_orangutan.ukkikki.geography.mapper;

import com.dancing_orangutan.ukkikki.geography.application.query.FetchCitiesQuery;
import com.dancing_orangutan.ukkikki.geography.domain.City;
import org.springframework.stereotype.Component;

@Component
public class CityMapper {

    public City queryToDomain(FetchCitiesQuery query) {
        return City.builder()
                .continentId(query.continentId())
                .countryId(query.countryId())
                .build();
    }
}
