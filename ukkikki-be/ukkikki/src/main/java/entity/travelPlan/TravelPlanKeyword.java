package entity.travelPlan;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plan_keywords")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TravelPlanKeyword {

	@EmbeddedId
	private TravelPlanKeywordId travelPlanKeywordId;
}
