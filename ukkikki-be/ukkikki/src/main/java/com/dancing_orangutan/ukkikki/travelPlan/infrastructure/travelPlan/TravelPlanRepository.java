package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.mapper.TravelPlanMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class TravelPlanRepository {

	private final JpaTravelPlanRepository jpaTravelPlanRepository;

	private final TravelPlanMapper travelPlanMapper;

	public TravelPlan save(final TravelPlan travelPlanDomain) {
		return travelPlanMapper.entityToDomain(
				jpaTravelPlanRepository.save(travelPlanMapper.domainToEntity(travelPlanDomain)));
	}
}
