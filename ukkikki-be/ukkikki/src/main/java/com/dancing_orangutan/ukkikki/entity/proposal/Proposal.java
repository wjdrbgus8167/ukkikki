package com.dancing_orangutan.ukkikki.entity.proposal;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.entity.info.Airport;
import com.dancing_orangutan.ukkikki.entity.member.Company;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "proposals")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Proposal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer proposalId;

	@Column(nullable = false, name = "start_date")
	private LocalDate startDate;

	@Column(nullable = false, name = "end_date")
	private LocalDate endDate;

	@Column(nullable = false, length = 50)
	private String airline;

	@Column(nullable = false, name = "start_date_boarding_time")
	private LocalDateTime startDateBoardingTime;

	@Column(nullable = false, name = "start_date_arrival_time")
	private LocalDateTime startDateArrivalTime;

	@Column(nullable = false, name = "end_date_boarding_time")
	private LocalDateTime endDateBoardingTime;

	@Column(nullable = false, name = "end_date_arrival_time")
	private LocalDateTime endDateArrivalTime;

	@Column(nullable = false)
	private int deposit;

	@Column(nullable = false, name = "min_people")
	private int minPeople;

	@Column(nullable = false, name = "guide_included")
	private boolean guideIncluded;

	@Column(nullable = false, name = "product_introduction", length = 4000)
	private String productIntroduction;

	@Column(nullable = false, name = "refund_policy", length = 4000)
	private String refundPolicy;

	@Column(nullable = false, name = "insurance_included")
	private boolean insuranceIncluded;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, name = "proposal_status")
	private ProposalStatus proposalStatus;

	@Column(nullable = false, name = "create_time", updatable = false)
	@CreatedDate
	private LocalDateTime createTime;

	@Column(name = "update_time")
	private LocalDateTime updateTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "company_id")
	private Company company;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "travel_plan_id")
	private TravelPlanEntity travelPlan;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "departure_airport_code")
	private Airport departureAirport;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "arrival_airport_code")
	private Airport arrivalAirport;

}
