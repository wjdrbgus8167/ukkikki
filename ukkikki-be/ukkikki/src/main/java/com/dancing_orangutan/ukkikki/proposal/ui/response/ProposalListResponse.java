package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class ProposalListResponse {

    private Integer proposalId;
    private String name;
    private Integer voteCount;
    private String companyName;
    private Integer deposit;
    private boolean votedYn;

    @Builder
    public ProposalListResponse(Integer proposalId, String name, Integer voteCount, String companyName, Integer deposit, boolean votedYn) {
        this.proposalId = proposalId;
        this.name = name;
        this.voteCount = voteCount;
        this.companyName = companyName;
        this.deposit = deposit;
        this.votedYn = votedYn;

    }
}
