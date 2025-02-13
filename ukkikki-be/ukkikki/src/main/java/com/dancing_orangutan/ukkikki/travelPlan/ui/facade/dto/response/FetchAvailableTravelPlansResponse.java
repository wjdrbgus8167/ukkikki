package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common.TravelPlanResponse;
import java.util.List;

import lombok.Builder;

public record FetchAvailableTravelPlansResponse(
		List<TravelPlanResponse> travelPlans,
		int totalPages,
		long totalElements,
		int pageNumber,
		int pageSize
) {

	@Builder
	public FetchAvailableTravelPlansResponse {

	}
}
