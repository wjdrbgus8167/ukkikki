package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateInquiryCommand;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateInquiryRequest {

    String title;
    String content;

    @Builder
    public CreateInquiryRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public CreateInquiryCommand requestToDomain(Integer proposalId, Integer travelPlanId, Integer memberId) {
        validate(proposalId, travelPlanId, memberId);
        return CreateInquiryCommand
                .builder()
                .title(title)
                .content(content)
                .travelPlanId(travelPlanId)
                .memberId(memberId)
                .proposalId(proposalId)
                .build();
    }
    private void validate(Integer memberId, Integer travelPlanId, Integer proposalId) {
        if (travelPlanId == null) {
            throw new IllegalArgumentException("여행 계획 ID는 필수입니다.");
        }
        if (memberId == null) {
            throw new IllegalArgumentException("회원 ID는 필수입니다.");
        }
        if(proposalId == null) {
            throw new IllegalArgumentException("제안서 ID는 필수입니다.");
        }

        if (title ==null ) {
            throw new IllegalArgumentException("문의 제목을 입력해주세요");
        }

        if (content ==null ) {
            throw new IllegalArgumentException("문의 내용을 입력해주세요.");
        }

        if (travelPlanId <= 0) {
            throw new IllegalArgumentException("여행 계획 ID는 양수여야 합니다.");
        }

        if (memberId <= 0) {
            throw new IllegalArgumentException("회원 ID는 양수여야 합니다.");
        }

        if(proposalId <=0) {
            throw new IllegalArgumentException("제안서 ID는 양수여야 합니다.");
        }
    }
}
