package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ConfirmProposalResponse {

    private Integer proposalId;
    private String name ;
    private ProposalStatus status;
    private Integer deposit;
    private Integer voteCount ;

    @Builder
    public ConfirmProposalResponse(Integer proposalId,String name, ProposalStatus status,Integer deposit,Integer voteCount) {
        this.proposalId = proposalId;
        this.name = name;
        this.status = status;
        this.deposit = deposit;
        this.voteCount = voteCount;
    }
}
