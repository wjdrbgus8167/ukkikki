package com.dancing_orangutan.ukkikki.travelPlan.application.command.common;

import lombok.Builder;

public record UpdateCompanionCountCommand(Integer travelPlanId, Integer memberId,
                                          int adultCount, int childCount, int infantCount) {

    @Builder
    public UpdateCompanionCountCommand {

    }

    public void validate() {
        if(travelPlanId == null || travelPlanId <= 0) {
            throw new IllegalArgumentException("여행 계획 ID는 필수이며 양수입니다.");
        }

        if(adultCount<0 || infantCount<0 || childCount<0)  {
            throw new IllegalArgumentException("인원은 무조건 양수입니다.");
        }

        if (adultCount + infantCount + childCount < 1) {
            throw new IllegalArgumentException("인원은 한명이상 참여해야합니다.");
        }
    }
}
