package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
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
