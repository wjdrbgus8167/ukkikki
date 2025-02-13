package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTravelPlanId implements Serializable {

	@EqualsAndHashCode.Include
	@Column
	private Integer memberId;

	@Column
	@EqualsAndHashCode.Include
	private Integer travelPlanId;

	@Builder
	public MemberTravelPlanId(Integer memberId, Integer travelPlanId) {
		this.memberId = memberId;
		this.travelPlanId = travelPlanId;
	}
}
