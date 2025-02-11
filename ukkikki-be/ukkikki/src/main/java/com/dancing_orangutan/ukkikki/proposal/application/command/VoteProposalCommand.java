package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class VoteProposalCommand {

    Integer travelerId;
    Integer proposalId;
    Integer memberId;
    Integer voteSurveyId;
    LocalDateTime voteTime;

    @Builder
    public VoteProposalCommand(Integer travelerId, Integer proposalId,  Integer memberId, Integer voteSurveyId, LocalDateTime voteTime) {
        this.travelerId = travelerId;
        this.proposalId = proposalId;
        this.memberId = memberId;
        this.voteSurveyId = voteSurveyId;
        this.voteTime = voteTime;
    }
}
