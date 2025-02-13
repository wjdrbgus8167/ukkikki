package com.dancing_orangutan.ukkikki.proposal.domain.Inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class InquiryEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer inquiryId;

	@Column(nullable = false, length = 1000)
	private String title;

	@Column(nullable = false, length = 1000)
	private String content;

	@Column(nullable = true, length = 1000)
	private String answer;

	@CreatedDate
	@Column(nullable = false, name = "create_time")
	private LocalDateTime createTIme;

	@Column(name = "completed_time")
	private LocalDateTime completedTIme;

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
	public InquiryEntity(Integer inquiryId, String title, String content, String answer,LocalDateTime createTIme,LocalDateTime completedTIme,ProposalEntity proposal
	, MemberTravelPlanEntity memberTravelPlan) {

		this.inquiryId = inquiryId;
		this.title = title;
		this.content = content;
		this.answer = answer;
		this.createTIme = createTIme;
		this.completedTIme = completedTIme;
		this.proposal = proposal;
		this.memberTravelPlan = memberTravelPlan;
	}
}
