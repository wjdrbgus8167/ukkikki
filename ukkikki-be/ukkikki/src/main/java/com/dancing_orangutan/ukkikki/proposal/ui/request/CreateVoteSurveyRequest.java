package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateVoteSurveyCommand;

import java.time.LocalDateTime;

public class CreateVoteSurveyRequest {

    public CreateVoteSurveyCommand toCommand(Integer travelPlanId, Integer proposalId,Integer memberId) {
        return CreateVoteSurveyCommand.builder()
                .surveyStartTime(LocalDateTime.now())
                .surveyEndTime(LocalDateTime.now().plusHours(72))
                .travelPlanId(travelPlanId)
                .proposalId(proposalId)
                .memberId(memberId)
                .build();
    }
}
