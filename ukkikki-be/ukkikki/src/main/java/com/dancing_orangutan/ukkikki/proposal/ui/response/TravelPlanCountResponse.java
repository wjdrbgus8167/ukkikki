package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class TravelPlanCountResponse {
    Integer travelPlanId;
    Integer count;

    @Builder
    public TravelPlanCountResponse(Integer count, Integer travelPlanId) {
        this.count = count;
        this.travelPlanId = travelPlanId;
    }
}
