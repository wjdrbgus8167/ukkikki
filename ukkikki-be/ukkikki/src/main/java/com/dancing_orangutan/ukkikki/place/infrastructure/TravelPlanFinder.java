package com.dancing_orangutan.ukkikki.place.infrastructure;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
@RequiredArgsConstructor
public class TravelPlanFinder {
    
    private final TravelPlanRepository travelPlanRepository;

    public Optional<TravelPlanEntity> findByTravelPlanId(Integer travelPlanId) {
        return travelPlanRepository.findById(travelPlanId);
    }
}
