package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plan_keywords")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TravelPlanKeywordEntity {

	@EmbeddedId
	private TravelPlanKeywordId travelPlanKeywordId;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("travelPlanId")
	@JoinColumn(name = "travel_plan_id")
	private TravelPlanEntity travelPlan;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("keywordId")
	@JoinColumn(name = "keyword_id")
	private KeywordEntity keyword;

	@Builder
	public TravelPlanKeywordEntity(TravelPlanEntity travelPlan, KeywordEntity keyword) {
		this.travelPlanKeywordId = new TravelPlanKeywordId(travelPlan.getTravelPlanId(),
				keyword.getKeywordId());
		this.travelPlan = travelPlan;
		this.keyword = keyword;
	}
}
