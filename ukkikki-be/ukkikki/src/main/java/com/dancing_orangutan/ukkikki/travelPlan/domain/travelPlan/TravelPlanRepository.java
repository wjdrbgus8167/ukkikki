package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;


import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TravelPlanRepository {

	void store(TravelPlanEntity entity);

	Optional<TravelPlanEntity> findById(Integer travelPlanId);

	Optional<TravelPlanEntity> findWithRelationsByTravelPlanId(Integer travelPlanId);

	Page<TravelPlanEntity> findByPlanningStatusNot(PlanningStatus status, Pageable pageable);

	void deleteById(Integer travelPlanId);

}
