package com.dancing_orangutan.ukkikki.travelPlan.application.command.common;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.MemberTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;

public record TravelPlanCommand(String name, LocalDate startDate, LocalDate endDate, int minPeople, int maxPeople,
								PlanningStatus planningStatus, MemberTravelPlanCommand memberTravelPlanCommand, CityCommand arrivalCity, CityCommand departureCity,
								List<Integer> keywords) {



	@Builder
	public TravelPlanCommand{

	}

}