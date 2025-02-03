package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@NoArgsConstructor
public class TravelPlanKeywordId implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Integer travelPlanId;

	@Column
	@EqualsAndHashCode.Include
	private Integer keywordId;

	@Builder
	public TravelPlanKeywordId(Integer travelPlanId, Integer keywordId) {
		this.travelPlanId = travelPlanId;
		this.keywordId = keywordId;
	}
}
