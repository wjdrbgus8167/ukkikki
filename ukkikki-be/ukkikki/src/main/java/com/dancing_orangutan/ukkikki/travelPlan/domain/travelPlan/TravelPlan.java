package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
public class TravelPlan {

	private final TravelPlanInfo travelPlanInfo;
	private final Host host;
	private final List<Integer> keywords;

	@Builder()
	public TravelPlan(final TravelPlanInfo travelPlanInfo, final Host host, final List<Integer> keywords) {
		this.travelPlanInfo = travelPlanInfo;
		this.host = host;
		this.keywords = keywords;
	}
}

