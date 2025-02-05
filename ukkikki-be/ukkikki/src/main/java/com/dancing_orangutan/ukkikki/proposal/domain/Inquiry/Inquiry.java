package com.dancing_orangutan.ukkikki.proposal.domain.Inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class Inquiry {

    private final Integer inquiryId;
    private final String title;
    private final String content;
    private final String answer;
    private final LocalDateTime createTime;
    private final LocalDateTime completedTime;
    private final Proposal proposal;

    @Builder
    public Inquiry(Integer inquiryId, String title, String content, String answer,
                   LocalDateTime createTime, LocalDateTime completedTime,
                   Proposal proposal) {
        this.inquiryId = inquiryId;
        this.title = title;
        this.content = content;
        this.answer = answer;
        this.createTime = createTime;
        this.completedTime = completedTime;
        this.proposal = proposal;

    }
}
