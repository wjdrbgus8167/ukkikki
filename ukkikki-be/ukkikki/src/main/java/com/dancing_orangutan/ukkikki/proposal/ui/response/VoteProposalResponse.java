package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class VoteProposalResponse {
    private Integer voteId;
    private Integer proposalId;
    private Integer voteSurveyId;
    private LocalDateTime voteTime;

    @Builder
    public VoteProposalResponse(Integer voteId, Integer proposalId, Integer voteSurveyId, LocalDateTime voteTime) {
        this.voteId = voteId;
        this.proposalId = proposalId;
        this.voteSurveyId = voteSurveyId;
        this.voteTime = voteTime;
    }
}
