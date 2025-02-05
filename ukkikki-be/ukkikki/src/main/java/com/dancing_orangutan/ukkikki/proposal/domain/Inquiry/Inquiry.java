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
    private final LocalDateTime createTIme;
    private final LocalDateTime completedTIme;
    private final Integer proposalId;
    private final Integer memberId;
    private final Integer travelPlanId;

    @Builder
    public Inquiry(Integer inquiryId, String title, String content, String answer,
                   LocalDateTime createTIme, LocalDateTime completedTIme,
                   Integer proposalId,Integer memberId,Integer travelPlanId) {
        this.inquiryId = inquiryId;
        this.title = title;
        this.content = content;
        this.answer = answer;
        this.createTIme = createTIme;
        this.completedTIme = completedTIme;
        this.proposalId = proposalId;
        this.memberId = memberId;
        this.travelPlanId = travelPlanId;

    }
}
