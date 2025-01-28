package com.dancing_orangutan.ukkikki.entity.proposal;

import com.dancing_orangutan.ukkikki.entity.member.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Vote {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer voteId;

	@CreatedDate
	@Column(nullable = false)
	private LocalDateTime voteDate;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vote_survey_id")
	private VoteSurvey voteSurvey;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private Proposal proposal;
}
