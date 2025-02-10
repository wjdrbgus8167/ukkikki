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

    @Builder
    public CreateVoteSurveyResponse(LocalDateTime surveyStartTime, LocalDateTime surveyEndTime, Integer travelPlanId) {

        this.surveyStartTime = surveyStartTime;
        this.surveyEndTime = surveyEndTime;
        this.travelPlanId = travelPlanId;
    }
}
