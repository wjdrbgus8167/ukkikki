package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
public class TravelPlan {

	private final Integer travelPlanId;
	private final Integer memberId;
	private final String name;
	private final LocalDate startDate;
	private final LocalDate endDate;
	private final String hostComment;
	private final PlanningStatus planningStatus;
	private final int minPeople;
	private final int maxPeople;
	private final Integer departureCityId;
	private final Integer arrivalCityId;
	private final List<Integer> keywords;
	private final int adultCount;
	private final int childCount;
	private final int infantCount;

	@Builder
	public TravelPlan(Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
			String hostComment, PlanningStatus planningStatus, int minPeople, int maxPeople,
			Integer departureCityId, Integer arrivalCityId, List<Integer> keywords, Integer memberId, int adultCount, int childCount, int infantCount) {

		this.travelPlanId = travelPlanId;
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.hostComment = hostComment;
		this.planningStatus = planningStatus;
		this.minPeople = minPeople;
		this.maxPeople = maxPeople;
		this.departureCityId = departureCityId;
		this.arrivalCityId = arrivalCityId;
		this.keywords = keywords;
		this.memberId = memberId;
		this.adultCount = adultCount;
		this.infantCount = infantCount;
		this.childCount = childCount;
	}

}

