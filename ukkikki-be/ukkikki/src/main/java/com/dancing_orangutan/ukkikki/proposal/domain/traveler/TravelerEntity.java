package com.dancing_orangutan.ukkikki.proposal.domain.traveler;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travelers")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class TravelerEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer travelerId;

	@Column(nullable = false, name = "korean_name", length = 10)
	private String koreanName;

	@Column(nullable = false, name = "english_name", length = 50)
	private String englishName;

	@Column(nullable = false, name = "passport_number", length = 30)
	private String passportNumber;

	@Column(nullable = false, name = "expiration_date")
	private LocalDate expirationDate;

	@Column(nullable = false, name = "birth_date")
	private LocalDate birthDate;

	@Column(name = "phone_number", length = 11)
	private String phoneNumber;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private ProposalEntity proposal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumns({
			@JoinColumn(name = "travel_plan_id"),
			@JoinColumn(name = "member_id")
	})
	private MemberTravelPlanEntity memberTravelPlan;
}

