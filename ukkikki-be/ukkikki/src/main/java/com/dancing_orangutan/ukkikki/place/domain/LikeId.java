package com.dancing_orangutan.ukkikki.place.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeId implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Integer placeId;

	@EqualsAndHashCode.Include
	@Column
	private Integer memberId;

	public LikeId(Integer placeId, Integer memberId) {
		this.placeId = placeId;
		this.memberId = memberId;
	}
}
