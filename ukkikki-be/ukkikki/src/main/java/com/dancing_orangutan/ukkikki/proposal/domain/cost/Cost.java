package com.dancing_orangutan.ukkikki.proposal.domain.cost;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Cost {

    private final Integer costId;
    private final int maxPeople;
    private final int minPeople;
    private final int cost;
    private final Integer proposalId;

    @Builder
    public Cost(Integer costId,int maxPeople, int minPeople, int cost, Integer proposalId) {
        this.costId = costId;
        this.maxPeople = maxPeople;
        this.minPeople = minPeople;
        this.cost = cost;
        this.proposalId = proposalId;
    }
}
