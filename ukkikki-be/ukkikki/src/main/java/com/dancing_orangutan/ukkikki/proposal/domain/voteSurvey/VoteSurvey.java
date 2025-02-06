package com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class VoteSurvey {

    private final Integer voteSurveyId;
    private final LocalDateTime surveyStartTime;
    private final LocalDateTime surveyEndTime;
    private final Integer travelPlanId;

    @Builder
    public VoteSurvey(Integer voteSurveyId, LocalDateTime surveyStartTime, LocalDateTime surveyEndTime, Integer travelPlanId) {
        this.voteSurveyId = voteSurveyId;
        this.surveyStartTime = surveyStartTime;
        this.surveyEndTime = surveyEndTime;
        this.travelPlanId = travelPlanId;
    }
}
