package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel;

import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "member_travel_plans")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class MemberTravelPlanEntity {

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

	@LastModifiedDate
	@Column(nullable = false, name = "last_join_time")
	private LocalDateTime lastJoinTime;

	@Column(nullable = false, name = "exit_yn")
	private boolean exitYn;

	@Column(nullable = true, name = "exit_time")
	private LocalDateTime exitTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("travelPlanId")
	@JoinColumn(name = "travel_plan_id")
	private TravelPlanEntity travelPlan;

	@ManyToOne(fetch = FetchType.LAZY)
	@MapsId("memberId")
	@JoinColumn(name = "member_id")
	private MemberEntity member;

	@Builder
	public MemberTravelPlanEntity(MemberTravelPlanId memberTravelPlanId,
			TravelPlanEntity travelPlan, MemberEntity member,
			boolean hostYn, int adultCount, int childCount, int infantCount,
			boolean exitYn, LocalDateTime exitTime) {
		this.memberTravelPlanId = memberTravelPlanId;
		this.travelPlan = travelPlan;
		this.member = member;
		this.hostYn = hostYn;
		this.adultCount = adultCount;
		this.childCount = childCount;
		this.infantCount = infantCount;
		this.exitYn = exitYn;
		this.exitTime = exitTime;
	}

	public void updateLastJoinTime() {
		this.lastJoinTime = LocalDateTime.now();
	}
}



