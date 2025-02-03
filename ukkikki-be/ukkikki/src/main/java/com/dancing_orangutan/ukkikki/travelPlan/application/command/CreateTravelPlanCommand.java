package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import lombok.Builder;

import java.time.LocalDate;

import java.util.List;

public record CreateTravelPlanCommand(
		Integer departureCityId,
		Integer arrivalCityId,
		String name,
		LocalDate startDate,
		LocalDate endDate,
		List<Integer> keywords,
		int minPeople,
		int maxPeople,
		int adultCount,
		int childCount,
		int infantCount,
		PlanningStatus planningStatus,
		Integer memberId
) {
	@Builder
	public CreateTravelPlanCommand{

	}
}
