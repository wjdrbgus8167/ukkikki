package com.dancing_orangutan.ukkikki.travelPlan.infrastructure;

import com.dancing_orangutan.ukkikki.entity.info.City;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CityFinder {

	private final JpaCityRepository jpaCityRepository;

	public City findById(Integer cityId) {
		return jpaCityRepository.findById(cityId)
				.orElseThrow(() -> new IllegalArgumentException("해당 도시가 존재하지 않습니다. : " + cityId));
	}
}
