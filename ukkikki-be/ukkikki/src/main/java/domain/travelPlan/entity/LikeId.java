package domain.travelPlan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.AccessLevel;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class LikeId implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Long placeId;

	@EqualsAndHashCode.Include
	@Column
	private Long memberId;
}
