package com.dancing_orangutan.ukkikki.dto.travelPlan.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CreateTravelPlanResponse {

	private TravelPlanResponse travelPlan;

	@Getter
	@Builder
	public static class TravelPlanResponse {

		private Integer travelPlanId;

		private String name;

		private Integer departureCityId;

		private Integer arrivalCityId;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
		private LocalDate startDate;

		@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
		private LocalDate endDate;

		private PlanningStatus planningStatus;

		private int minPeople;

		private int maxPeople;
	}
}
