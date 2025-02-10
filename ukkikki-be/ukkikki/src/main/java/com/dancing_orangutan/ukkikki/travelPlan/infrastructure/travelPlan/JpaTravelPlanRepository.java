package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface JpaTravelPlanRepository extends JpaRepository<TravelPlanEntity,Integer> {
	@EntityGraph(attributePaths = {
			"departureCity",
			"arrivalCity",
			"travelPlanKeywords.keyword",
			"memberTravelPlans.member",
			"places.placeTags",
			"places.likes"
	})
	Optional<TravelPlanEntity> findAllByTravelPlanId(Integer travelPlanId);

	Page<TravelPlanEntity> findByPlanningStatusNot(PlanningStatus planningStatus, Pageable pageable);
}
