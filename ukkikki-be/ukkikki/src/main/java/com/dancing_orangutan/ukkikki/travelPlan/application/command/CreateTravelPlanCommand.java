package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class CreateTravelPlanCommand {

	private Integer departureCityId;

	private Integer arrivalCityId;

	private String name;

	private LocalDate startDate;

	private LocalDate endDate;

	private List<KeywordCommand> keywords;

	private int minPeople;

	private int maxPeople;

	private int adultCount;

	private int childCount;

	private int infantCount;

	private PlanningStatus planningStatus;

	private Integer memberId;

	@Getter
	@Builder
	public static class KeywordCommand {

		private Integer keywordId;
	}
}