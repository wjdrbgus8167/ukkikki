package com.dancing_orangutan.ukkikki.proposal.domain.vote;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Vote {

    private final Integer voteId;
    private final LocalDateTime voteTime;
    private final Integer voteSurveyId;
    private final Integer memberId;
    private final Integer proposalId;

    @Builder
    public Vote(Integer voteId, LocalDateTime voteTime, Integer voteSurveyId, Integer memberId, Integer proposalId) {
        this.voteId = voteId;
        this.voteTime = voteTime;
        this.voteSurveyId = voteSurveyId;
        this.memberId = memberId;
        this.proposalId = proposalId;

    }
}
