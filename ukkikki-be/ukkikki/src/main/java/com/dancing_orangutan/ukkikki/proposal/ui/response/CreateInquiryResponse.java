package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class CreateInquiryResponse {

    private final Integer inquiryId;
    private final String title;
    private final String content;
    private final String answer;
    private final LocalDateTime createTime;
    private final LocalDateTime completedTime;

    public CreateInquiryResponse(Inquiry inquiry) {
        this.inquiryId = inquiry.getInquiryId();
        this.title = inquiry.getTitle();
        this.content = inquiry.getContent();
        this.answer = inquiry.getAnswer();
        this.createTime = inquiry.getCreateTIme();
        this.completedTime = inquiry.getCompletedTIme();
    }

    public static CreateInquiryResponse from(Inquiry inquiry) {
        return new CreateInquiryResponse(inquiry);
    }

}
