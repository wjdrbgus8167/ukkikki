package com.dancing_orangutan.ukkikki.proposal.domain.vote;

import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import com.dancing_orangutan.ukkikki.member.domain.member.MemberEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class VoteEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer voteId;

	@CreatedDate
	@Column(nullable = false, name = "vote_time")
	private LocalDateTime voteTime;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vote_survey_id")
	private VoteSurveyEntity voteSurvey;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private MemberEntity member;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "proposal_id")
	private ProposalEntity proposal;

	@Builder
	public VoteEntity(Integer voteId,LocalDateTime voteTime,VoteSurveyEntity voteSurvey,MemberEntity member,ProposalEntity proposal){
		this.voteId = voteId;
		this.voteTime = voteTime;
		this.voteSurvey = voteSurvey;
		this.member = member;
		this.proposal = proposal;

	}
}
