package com.dancing_orangutan.ukkikki.geography.mapper;


import com.dancing_orangutan.ukkikki.geography.domain.Continent;
import com.dancing_orangutan.ukkikki.geography.domain.ContinentEntity;
import com.dancing_orangutan.ukkikki.geography.ui.response.FetchContinentsResponse;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContinentMapper {

	public List<Continent> entitiesToDomains(List<ContinentEntity> entities) {
		return entities.stream()
				.map(entity -> Continent
						.builder()
						.name(entity.getName())
						.continentId(entity.getContinentId())
						.build())
				.toList();
	}

	public List<FetchContinentsResponse> domainsToResponses(List<Continent> domains) {
		return domains.stream()
				.map(domain -> FetchContinentsResponse.builder()
						.continentId(domain.continentId())
						.name(domain.name())
						.build()
				).toList();
	}
}
