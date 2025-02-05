package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateInquiryCommand {

    String title;
    String content;
    Integer proposalId;
    Integer travelPlanId;
    Integer memberId;

    @Builder
    public CreateInquiryCommand(String title, String content,Integer proposalId, Integer travelPlanId, Integer memberId){
        this.title = title;
        this.content = content;
        this.proposalId = proposalId;
        this.travelPlanId = travelPlanId;
        this.memberId = memberId;

    }
}
