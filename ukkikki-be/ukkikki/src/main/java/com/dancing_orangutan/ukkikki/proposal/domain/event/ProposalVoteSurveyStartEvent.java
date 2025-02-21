package com.dancing_orangutan.ukkikki.proposal.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import lombok.Builder;

import java.time.LocalDateTime;

public record ProposalVoteSurveyStartEvent(Integer travelPlanId, LocalDateTime closeTime) implements Event {

    @Builder
    public ProposalVoteSurveyStartEvent {

    }
}
