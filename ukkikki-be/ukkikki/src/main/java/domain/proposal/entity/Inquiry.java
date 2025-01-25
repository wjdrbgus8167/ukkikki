package domain.proposal.entity;

import domain.travelPlan.entity.MemberTravelPlan;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "inquiries")
public class Inquiry {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long inquiryId;

	@Column(nullable = false, length = 1000)
	private String title;

	@Column(nullable = false, length = 1000)
	private String content;

	@Column(nullable = false, length = 1000)
	private String answer;

	@CreatedDate
	@Column(nullable = false, name = "create_time")
	private LocalDateTime createTIme;

	@Column(name = "completed_time")
	private LocalDateTime completedTIme;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private Proposal proposal;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_travel_plan_id")
	private MemberTravelPlan memberTravelPlan;
}
