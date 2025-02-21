package com.dancing_orangutan.ukkikki.proposal.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

public record VoteSurveyCloseTimeReachedEvent(Integer travelPlanId) implements Event {

    @Builder
    public VoteSurveyCloseTimeReachedEvent{

    }
}
