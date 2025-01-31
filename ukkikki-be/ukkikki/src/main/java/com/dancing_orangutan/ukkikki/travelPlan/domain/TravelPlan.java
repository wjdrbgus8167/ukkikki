package com.dancing_orangutan.ukkikki.travelPlan.domain;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TravelPlan {

	private Integer travelPlanId;

	private String name;

	private LocalDate startDate;

	private LocalDate endDate;

	private String hostComment;

	private PlanningStatus planningStatus;

	private int minPeople;

	private int maxPeople;

	private CityEntity departureCity;

	private CityEntity arrivalCity;
}
