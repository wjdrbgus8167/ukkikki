package com.dancing_orangutan.ukkikki.geography.mapper;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.geography.application.query.FetchCitiesQuery;
import com.dancing_orangutan.ukkikki.geography.domain.City;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchCitiesResponse;
import java.util.List;
import org.springframework.stereotype.Component;

@Component
public class CityMapper {

	public City queryToDomain(final FetchCitiesQuery query) {
		return City.builder()
				.continentId(query.continentId())
				.countryId(query.countryId())
				.build();
	}

	public List<FetchCitiesResponse> domainsToResponses(final List<City> domains) {
		return domains.stream()
				.map(domain -> FetchCitiesResponse.builder()
						.name(domain.name())
						.cityId(domain.cityId())
						.build()
				).toList();
	}

	public List<City> entitiesToDomains(List<CityEntity> entities) {
		return entities.stream()
				.map(entity -> City.builder()
						.cityId(entity.getCityId())
						.name(entity.getName())
						.build())
				.toList();
	}
}
