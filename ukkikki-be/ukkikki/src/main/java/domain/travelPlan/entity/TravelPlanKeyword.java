package domain.travelPlan.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "travel_plan_keywords")
public class TravelPlanKeyword {

	@EmbeddedId
	private TravelPlanKeywordId travelPlanKeywordId;
}
