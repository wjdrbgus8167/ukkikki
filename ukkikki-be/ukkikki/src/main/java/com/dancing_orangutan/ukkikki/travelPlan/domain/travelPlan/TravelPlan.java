package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;


import lombok.Builder;
import lombok.Getter;

@Getter
public class TravelPlan {

	private final TravelPlanInfo travelPlanInfo;
	private final Host host;


	@Builder()
	public TravelPlan(final TravelPlanInfo travelPlanInfo, final Host host) {
		this.travelPlanInfo = travelPlanInfo;
		this.host = host;
	}

	public int calPeopleCount() {
		return host.adultCount() + host.childCount() + host.infantCount();
	}
}

