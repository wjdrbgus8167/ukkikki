package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import lombok.Builder;

public record UpdateTravelPlanStatusCommand(PlanningStatus planningStatus, Integer travelPlanId) {

    @Builder
    public UpdateTravelPlanStatusCommand {

    }

    public void validate() {
        if (planningStatus == null) {
            throw new IllegalArgumentException("여행 계획 상태는 필수입니다.");
        }
        if (travelPlanId == null) {
            throw new IllegalArgumentException("여행 계획 ID는 필수입니다.");
        }
    }
}
