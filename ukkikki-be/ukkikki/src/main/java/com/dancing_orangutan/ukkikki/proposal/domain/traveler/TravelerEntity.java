package com.dancing_orangutan.ukkikki.proposal.domain.traveler;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import jakarta.persistence.*;

import java.time.LocalDate;
import lombok.AccessLevel;
import lombok.Builder;
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
			@JoinColumn(name = "member_id"),
			@JoinColumn(name = "travel_plan_id")
	})
	private MemberTravelPlanEntity memberTravelPlan;

	@Builder
	public TravelerEntity( Integer travelerId,String koreanName,String englishName,String passportNumber,LocalDate expirationDate,LocalDate birthDate,String phoneNumber,ProposalEntity proposal
	,MemberTravelPlanEntity memberTravelPlan) {
		this.travelerId = travelerId;
		this.koreanName = koreanName;
		this.englishName = englishName;
		this.passportNumber = passportNumber;
		this.expirationDate = expirationDate;
		this.birthDate = birthDate;
		this.phoneNumber = phoneNumber;
		this.proposal = proposal;
		this.memberTravelPlan = memberTravelPlan;

	}
}

