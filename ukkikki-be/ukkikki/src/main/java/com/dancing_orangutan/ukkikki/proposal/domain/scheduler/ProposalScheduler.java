package com.dancing_orangutan.ukkikki.proposal.domain.scheduler;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.proposal.domain.event.ProposalVoteSurveyStartEvent;
import com.dancing_orangutan.ukkikki.proposal.domain.scheduler.task.ProposalVoteSurveyExpirationTask;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;

@Component
@Slf4j
public class ProposalScheduler {

    private final TaskScheduler scheduler;
    private final SpringEventPublisher springEventPublisher;

    public ProposalScheduler(@Qualifier("threadPoolTaskScheduler")TaskScheduler scheduler,
                             SpringEventPublisher springEventPublisher) {
       this.scheduler = scheduler;
       this.springEventPublisher = springEventPublisher;
    }

    @EventListener
    public void expireVote(final ProposalVoteSurveyStartEvent event) {
        Instant expirationInstant = event.closeTime().atZone(ZoneId.systemDefault()).toInstant();
        Runnable expirationTask = ProposalVoteSurveyExpirationTask.builder()
                .travelPlanId(event.travelPlanId())
                .eventPublisher(springEventPublisher)
                .build();

        scheduler.schedule(expirationTask, expirationInstant);
    }
}
