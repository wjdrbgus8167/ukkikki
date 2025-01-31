package com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlanKeyword;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class TravelPlanKeywordRegistrant {

    private final JpaTravelPlanKeywordRepository jpaTravelPlanKeywordRepository;

    public void registerTravelPlanKeyword(TravelPlanKeywordEntity travelPlanKeywordEntity) {
        jpaTravelPlanKeywordRepository.save(travelPlanKeywordEntity);
    }
}
