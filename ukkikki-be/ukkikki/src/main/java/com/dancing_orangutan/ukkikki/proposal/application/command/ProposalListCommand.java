package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProposalListCommand {
    private Integer memberId;
    private Integer travelPlanId;

    @Builder
    public ProposalListCommand(Integer memberId, Integer travelPlanId) {
        this.memberId = memberId;
        this.travelPlanId = travelPlanId;
    }

}
