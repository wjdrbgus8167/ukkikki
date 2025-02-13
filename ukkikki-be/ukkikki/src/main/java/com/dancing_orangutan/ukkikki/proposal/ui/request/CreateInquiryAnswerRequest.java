package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateInquiryAnswerCommand;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateInquiryCommand;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateInquiryAnswerRequest {

    String answer;

    @Builder
    public CreateInquiryAnswerRequest(String answer) {
        this.answer = answer;
    }

    public CreateInquiryAnswerCommand toCommand(Integer proposalId, Integer travelPlanId, Integer companyId,Integer inquiryId) {

        return CreateInquiryAnswerCommand
                .builder()
                .travelPlanId(travelPlanId)
                .proposalId(proposalId)
                .companyId(companyId)
                .answer(answer)
                .inquiryId(inquiryId)
                .build();
    }
}
