package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;


import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.MemberResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import java.util.List;
import lombok.Builder;


public record JoinTravelPlanResponse(List<MemberResponse> members, TravelPlanResponse travelPlan) {

	@Builder
	public JoinTravelPlanResponse{

	}

}


