package entity.travelPlan;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

@Entity
@Table(name = "user_travel_plans")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberTravelPlan {

	@EmbeddedId
	private MemberTravelPlanId memberTravelPlanId;

	@Column(nullable = false, name = "host_yn")
	private boolean hostYn;

	@Column(nullable = false, name = "adult_count")
	private int adultCount;

	@Column(nullable = false, name = "child_count")
	private int childCount;

	@Column(nullable = false, name = "infant_count")
	private int infantCount;

	@CreatedDate
	@Column(nullable = false, name = "first_join_time")
	private LocalDateTime firstJoinTime;

	@Column(nullable = false, name = "last_join_time")
	private LocalDateTime lastJoinTime;

	@Column(nullable = false, name = "exit_yn")
	private boolean exitYn;

	@Column(nullable = false, name = "exit_time")
	private LocalDateTime exitTime;
}
