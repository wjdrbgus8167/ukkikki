package com.dancing_orangutan.ukkikki.travelPlan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
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
}
