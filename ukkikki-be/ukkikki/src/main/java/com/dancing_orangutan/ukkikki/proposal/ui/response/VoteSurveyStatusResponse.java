package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class VoteSurveyStatusResponse {
    Integer voteSurveyId;
    Integer travelPlanId;
    LocalDateTime surveyStartTime;
    LocalDateTime surveyEndTime;

    @Builder
    public VoteSurveyStatusResponse(Integer voteSurveyId,Integer travelPlanId, LocalDateTime surveyStartTime, LocalDateTime surveyEndTime) {
        this.voteSurveyId = voteSurveyId;
        this.travelPlanId = travelPlanId;
        this.surveyStartTime = surveyStartTime;
        this.surveyEndTime = surveyEndTime;

    }
}
