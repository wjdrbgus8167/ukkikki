package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class InquiryListResponse {

    private final Integer inquiryId;
    private final String name;
    private final String title;
    private final String content;
    private final String answer;
    private final LocalDateTime createTime;
    private final LocalDateTime completedTime;

    @Builder
    public InquiryListResponse(Integer inquiryId, String name, String title, String content, String answer,
                               LocalDateTime createTime, LocalDateTime completedTime) {
        this.inquiryId = inquiryId;
        this.name = name;
        this.title = title;
        this.content = content;
        this.answer = answer;
        this.createTime = createTime;
        this.completedTime = completedTime;
    }

    public static InquiryListResponse from(InquiryEntity inquiryEntity) {

        return InquiryListResponse.builder()
                .inquiryId(inquiryEntity.getInquiryId())
                .name(inquiryEntity.getMemberTravelPlan().getMember().getName()) // Member 엔티티에서 이름 가져오기
                .title(inquiryEntity.getTitle())
                .content(inquiryEntity.getContent())
                .answer(inquiryEntity.getAnswer())
                .createTime(inquiryEntity.getCreateTIme())
                .completedTime(inquiryEntity.getCompletedTIme())
                .build();
    }
}
