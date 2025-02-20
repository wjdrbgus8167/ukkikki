package com.dancing_orangutan.ukkikki.travelPlan.application.query;

import lombok.Builder;
import org.springframework.data.domain.Pageable;

public record FetchAvailableTravelPlanQuery(Pageable pageable) {
	@Builder
	public FetchAvailableTravelPlanQuery{

	}

}
