package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plan_keywords")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelPlanKeywordEntity {

	@EmbeddedId
	private TravelPlanKeywordId travelPlanKeywordId;

	@Builder
	public TravelPlanKeywordEntity(TravelPlanKeywordId travelPlanKeywordId) {
		this.travelPlanKeywordId = travelPlanKeywordId;
	}

}
