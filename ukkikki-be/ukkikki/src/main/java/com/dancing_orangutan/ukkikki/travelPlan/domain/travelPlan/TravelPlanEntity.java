package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlaceEntity;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.MessageEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanId;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity;
import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "travel_plans")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class TravelPlanEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer travelPlanId;

	@Column(nullable = false, length = 20)
	private String name;

	@Column(nullable = false, name = "start_date")
	private LocalDate startDate;

	@Column(nullable = false, name = "end_date")
	private LocalDate endDate;

	@Column(length = 1000)
	private String hostComment;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name = "planning_status")
	private PlanningStatus planningStatus;

	@Column(name = "close_time")
	private LocalDateTime closeTime;

	@CreatedDate
	@Column(nullable = false, name = "create_time")
	private LocalDateTime createTime;

	@Column(nullable = false, name = "min_people")
	private int minPeople;

	@Column(nullable = false, name = "max_people")
	private int maxPeople;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "departure_city_id")
	private CityEntity departureCity;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "arrival_city_id")
	private CityEntity arrivalCity;

	@OneToMany(mappedBy = "travelPlan", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<TravelPlanKeywordEntity> travelPlanKeywords;

	@OneToMany(mappedBy = "travelPlan", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<MemberTravelPlanEntity> memberTravelPlans;

	@OneToMany(mappedBy = "travelPlan", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<PlaceEntity> places;

	@OneToMany(mappedBy = "travelPlan", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<MessageEntity> messages;

	@Builder
	public TravelPlanEntity(String name, LocalDate startDate, LocalDate endDate,
			String hostComment, PlanningStatus planningStatus,
			int minPeople, int maxPeople, CityEntity departureCity,
			CityEntity arrivalCity, List<KeywordEntity> keywords,
			Integer memberId, int adultCount, int infantCount, int childCount) {
		this.name = name;
		this.startDate = startDate;
		this.endDate = endDate;
		this.hostComment = hostComment;
		this.planningStatus = planningStatus;
		this.minPeople = minPeople;
		this.maxPeople = maxPeople;
		this.departureCity = departureCity;
		this.arrivalCity = arrivalCity;
		this.travelPlanKeywords = new HashSet<>();
		this.memberTravelPlans = new HashSet<>();
		this.places = new HashSet<>();
		this.messages = new HashSet<>();
	}

	public void addTravelKeywords(List<KeywordEntity> keywords) {
		if (keywords != null) {
			keywords.forEach(this::addTravelKeyword);
		}
	}

	private void addTravelKeyword(KeywordEntity keyword) {
		this.travelPlanKeywords.add(
				TravelPlanKeywordEntity.builder()
						.travelPlan(this)
						.keyword(keyword)
						.build()
		);
	}

	public void addMemberTravelPlan(MemberEntity member, int adultCount, int infantCount, int childCount) {
		MemberTravelPlanEntity memberTravelPlan = MemberTravelPlanEntity.builder()
				.memberTravelPlanId(
						MemberTravelPlanId.builder()
								.travelPlanId(this.travelPlanId)
								.memberId(member.getMemberId())
								.build()
				)
				.travelPlan(this)
				.member(member)
				.hostYn(true)
				.adultCount(adultCount)
				.childCount(childCount)
				.infantCount(infantCount)
				.exitYn(false)
				.exitTime(null)
				.build();

		this.memberTravelPlans.add(memberTravelPlan);
	}

}
