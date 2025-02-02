package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import java.util.List;
import lombok.Builder;

public record TravelPlanKeyword(Integer travelPlanId, List<Integer> keywords) {


	@Builder
	public TravelPlanKeyword {
	}
}
