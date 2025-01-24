package domain.travelPlan.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import lombok.EqualsAndHashCode;

@Embeddable
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class LikeId implements Serializable {

	@Column
	@EqualsAndHashCode.Include
	private Long placeId;

	@EqualsAndHashCode.Include
	@Column
	private Long memberId;
}
