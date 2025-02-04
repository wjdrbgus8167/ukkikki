package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateTravelPlanResponse {

	private final TravelPlanResponse travelPlan;

	@Getter
	public static class TravelPlanResponse {

		private final Integer travelPlanId;

		private final String name;

		private final Integer departureCityId;

		private final Integer arrivalCityId;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
		private final LocalDate startDate;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
		private final LocalDate endDate;

		private final PlanningStatus planningStatus;

		private final int minPeople;

		private final int maxPeople;

		@Builder
		public TravelPlanResponse(Integer travelPlanId, String name, Integer departureCityId,
				Integer arrivalCityId, LocalDate startDate, LocalDate endDate,
				PlanningStatus planningStatus, int minPeople, int maxPeople) {
			this.travelPlanId = travelPlanId;
			this.name = name;
			this.departureCityId = departureCityId;
			this.arrivalCityId = arrivalCityId;
			this.startDate = startDate;
			this.endDate = endDate;
			this.planningStatus = planningStatus;
			this.minPeople = minPeople;
			this.maxPeople = maxPeople;
		}
	}

	@Builder
	public CreateTravelPlanResponse(TravelPlanResponse travelPlan) {
		this.travelPlan = travelPlan;
	}
}
