package com.dancing_orangutan.ukkikki.domain;

import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlanningStatus;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TravelPlanDomain {

	private Integer travelPlanId;

	private String name;

	private LocalDate startDate;

	private LocalDate endDate;

	private String hostComment;

	private PlanningStatus planningStatus;

	private int minPeople;

	private int maxPeople;

	private City departureCity;

	private City arrivalCity;
}
