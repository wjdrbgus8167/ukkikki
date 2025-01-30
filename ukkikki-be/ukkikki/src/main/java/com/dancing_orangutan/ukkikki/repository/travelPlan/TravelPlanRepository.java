package com.dancing_orangutan.ukkikki.repository.travelPlan;

import com.dancing_orangutan.ukkikki.domain.TravelPlanDomain;
import com.dancing_orangutan.ukkikki.mapper.TravelPlanMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelPlanRepository {

	private final JpaTravelPlanRepository jpaTravelPlanRepository;

	private final TravelPlanMapper travelPlanMapper;


	public TravelPlanDomain save(final TravelPlanDomain travelPlanDomain) {
		return travelPlanMapper.entityToDomain(
				jpaTravelPlanRepository.save(travelPlanMapper.domainToEntity(travelPlanDomain)));
	}
}
