package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import lombok.Builder;

public record FetchTravelPlanDetailsResponse(TravelPlanResponse travelPlan) {

    @Builder
    public FetchTravelPlanDetailsResponse {
    }

}

