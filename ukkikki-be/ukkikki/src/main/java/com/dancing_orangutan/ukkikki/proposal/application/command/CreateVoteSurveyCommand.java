package com.dancing_orangutan.ukkikki.proposal.application.command;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CreateVoteSurveyCommand {

    private LocalDateTime surveyStartTime;
    private LocalDateTime surveyEndTime;
    private Integer travelPlanId;
    private Integer proposalId;
    private Integer memberId;

    @Builder
    public CreateVoteSurveyCommand(LocalDateTime surveyStartTime, LocalDateTime surveyEndTime
            , Integer travelPlanId, Integer proposalId,Integer memberId) {

        this.surveyStartTime = surveyStartTime;
        this.surveyEndTime = surveyEndTime;
        this.travelPlanId = travelPlanId;
        this.proposalId = proposalId;
        this.memberId = memberId;

    }
}
