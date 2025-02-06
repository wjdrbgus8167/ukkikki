package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import java.time.LocalDateTime;
import lombok.Builder;

public record UpdateCloseTimeCommand(Integer travelPlanId, LocalDateTime closeTime) {


	@Builder
	public UpdateCloseTimeCommand {

	}

	public void validate() {
		if (closeTime == null) {
			throw new IllegalArgumentException("마감 시간은 반드시 설정해야 합니다.");
		}

		if (travelPlanId == null) {
			throw new IllegalArgumentException("여행 계획 ID는 필수 입력값입니다.");
		}
	}
}
