package com.dancing_orangutan.ukkikki.travelPlan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTravelPlanId implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Integer travelPlanId;

	@EqualsAndHashCode.Include
	@Column
	private Integer memberId;
}
