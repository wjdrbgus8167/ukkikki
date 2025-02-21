package com.dancing_orangutan.ukkikki.proposal.domain.event;

import com.dancing_orangutan.ukkikki.event.common.Event;
import java.time.LocalDateTime;
import lombok.Builder;

public record ProposalSubmissionPeriodExpiredEvent(Integer travelPlanId, LocalDateTime expireTime) implements Event {


	@Builder
	public ProposalSubmissionPeriodExpiredEvent{

	}
}
