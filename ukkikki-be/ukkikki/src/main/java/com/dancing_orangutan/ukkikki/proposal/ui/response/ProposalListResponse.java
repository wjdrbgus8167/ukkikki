package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
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
    private ProposalStatus proposalStatus;

    @Builder
    public ProposalListResponse(Integer proposalId, String name, Integer voteCount, String companyName, Integer deposit, boolean votedYn
    ,ProposalStatus proposalStatus) {
        this.proposalId = proposalId;
        this.name = name;
        this.voteCount = voteCount;
        this.companyName = companyName;
        this.deposit = deposit;
        this.votedYn = votedYn;
        this.proposalStatus = proposalStatus;

    }
}
