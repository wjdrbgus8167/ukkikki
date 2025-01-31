package com.dancing_orangutan.ukkikki.travelPlan.domain;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plan_keywords")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelPlanKeywordEntity {

	@EmbeddedId
	private TravelPlanKeywordId travelPlanKeywordId;
}
