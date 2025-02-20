package com.dancing_orangutan.ukkikki.proposal.infrastructure.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component("proposalTravelPlanFinder")
@RequiredArgsConstructor
public class TravelPlanFinder {

    private final TravelPlanRepository jpaTravelPlanRepository;

    public TravelPlanEntity getReferenceById(Integer travelPlanId) {
        return jpaTravelPlanRepository.findById(travelPlanId)
                .orElseThrow(() -> new EntityNotFoundException("해당 여행 걔획방을 찾을 수 없습니다."));
    }
}
