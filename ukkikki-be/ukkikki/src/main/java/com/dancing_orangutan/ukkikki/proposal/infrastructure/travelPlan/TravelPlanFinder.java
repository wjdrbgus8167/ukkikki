package com.dancing_orangutan.ukkikki.proposal.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.JpaTravelPlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TravelPlanFinder {

    private final JpaTravelPlanRepository jpaTravelPlanRepository;

    public TravelPlanEntity getReferenceById(Integer travelPlanId) {
        return jpaTravelPlanRepository.getReferenceById(travelPlanId);
    }
}
