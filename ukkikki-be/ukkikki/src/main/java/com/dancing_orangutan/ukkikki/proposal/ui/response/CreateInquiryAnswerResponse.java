package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateInquiryAnswerResponse {
    private Integer inquiryId;
    private Integer proposalId;
    private Integer companyId;
    private String title;
    private String content;
    private String answer;


    @Builder
    public CreateInquiryAnswerResponse(String answer, Integer companyId, Integer inquiryId, Integer proposalId, String title, String content) {
        this.answer = answer;
        this.companyId = companyId;
        this.title = title;
        this.content = content;
        this.inquiryId = inquiryId;
        this.proposalId = proposalId;
    }
}
