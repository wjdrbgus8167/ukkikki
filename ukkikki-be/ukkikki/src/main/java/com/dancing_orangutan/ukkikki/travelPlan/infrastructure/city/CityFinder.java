package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city;

import com.dancing_orangutan.ukkikki.geography.domain.CityEntity;
import com.dancing_orangutan.ukkikki.geography.infrastructure.JpaCityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CityFinder {

	private final JpaCityRepository jpaCityRepository;

	public CityEntity getReferenceById(Integer cityId) {
		return jpaCityRepository.getReferenceById(cityId);
	}
}
