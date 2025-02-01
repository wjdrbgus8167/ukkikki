package com.dancing_orangutan.ukkikki.entity.proposal;

import com.dancing_orangutan.ukkikki.entity.member.MemberEntity;
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
	@Column(nullable = false, name = "vote_time")
	private LocalDateTime voteTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vote_survey_id")
	private VoteSurvey voteSurvey;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private MemberEntity member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private Proposal proposal;
}
