package com.dancing_orangutan.ukkikki.travelPlan.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeIdEntity implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Integer placeId;

	@EqualsAndHashCode.Include
	@Column
	private Integer memberId;
}
