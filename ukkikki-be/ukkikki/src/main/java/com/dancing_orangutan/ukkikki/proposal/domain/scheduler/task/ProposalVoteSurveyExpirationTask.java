package com.dancing_orangutan.ukkikki.proposal.domain.scheduler.task;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.proposal.domain.event.VoteSurveyCloseTimeReachedEvent;
import lombok.Builder;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ProposalVoteSurveyExpirationTask implements Runnable {

    private Integer travelPlanId;
    private final SpringEventPublisher eventPublisher;

    @Builder
    public ProposalVoteSurveyExpirationTask(Integer travelPlanId, SpringEventPublisher eventPublisher) {
        this.travelPlanId = travelPlanId;
        this.eventPublisher = eventPublisher;
    }
    @Override
    public void run() {

        // Vote 종료시간 다됐다
        eventPublisher.publish(VoteSurveyCloseTimeReachedEvent.builder().travelPlanId(travelPlanId).build());
    }
}
