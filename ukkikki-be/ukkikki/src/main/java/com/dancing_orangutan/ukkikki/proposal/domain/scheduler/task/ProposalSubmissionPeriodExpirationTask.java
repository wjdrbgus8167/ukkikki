package com.dancing_orangutan.ukkikki.proposal.domain.scheduler.task;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.proposal.domain.event.ProposalSubmissionPeriodExpiredEvent;
import java.time.LocalDateTime;
import lombok.Builder;

public class ProposalSubmissionPeriodExpirationTask implements Runnable{

	private final Integer travelPlanId;
	private final LocalDateTime expireTime;
	private final SpringEventPublisher eventPublisher;

	@Builder
	public ProposalSubmissionPeriodExpirationTask(Integer travelPlanId, LocalDateTime expireTime,SpringEventPublisher eventPublisher) {
		this.travelPlanId = travelPlanId;
		this.eventPublisher = eventPublisher;
		this.expireTime = expireTime;
	}

	@Override
	public void run() {
		eventPublisher.publish(
				ProposalSubmissionPeriodExpiredEvent.builder()
						.travelPlanId(travelPlanId)
						.expireTime(expireTime)
						.build());
	}
}
