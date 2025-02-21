package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class CreateVoteSurveyResponse {
    private LocalDateTime surveyStartTime;
    private LocalDateTime surveyEndTime;
    private Integer travelPlanId;
    private Integer voteSurveyId;

    @Builder
    public CreateVoteSurveyResponse(LocalDateTime surveyStartTime, LocalDateTime surveyEndTime, Integer travelPlanId,Integer voteSurveyId) {

        this.surveyStartTime = surveyStartTime;
        this.surveyEndTime = surveyEndTime;
        this.travelPlanId = travelPlanId;
        this.voteSurveyId = voteSurveyId;
    }
}
