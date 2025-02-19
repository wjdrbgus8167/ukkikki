package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateInquiryAnswerCommand {

    private Integer proposalId;
    private Integer inquiryId;
    private String answer;
    private Integer travelPlanId;

    @Builder
    public CreateInquiryAnswerCommand(Integer proposalId, Integer inquiryId, String answer, Integer travelPlanId) {
        this.proposalId = proposalId;
        this.inquiryId = inquiryId;
        this.answer = answer;
        this.travelPlanId = travelPlanId;
    }
}
