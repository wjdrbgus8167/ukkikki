package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;


import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

public record CreateTravelPlanResponse(@JsonProperty("travelPlan") TravelPlanResponse travelPlanResponse) {

    
    @Builder 
    public CreateTravelPlanResponse{
        
    }
}
