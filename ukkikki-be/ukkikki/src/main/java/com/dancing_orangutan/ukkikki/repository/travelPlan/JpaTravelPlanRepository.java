package com.dancing_orangutan.ukkikki.repository.travelPlan;

import com.dancing_orangutan.ukkikki.entity.travelPlan.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface JpaTravelPlanRepository extends JpaRepository<TravelPlan,Integer> {

}
