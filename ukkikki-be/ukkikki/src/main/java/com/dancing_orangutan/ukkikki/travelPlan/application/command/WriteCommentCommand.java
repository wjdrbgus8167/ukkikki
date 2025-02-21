package com.dancing_orangutan.ukkikki.travelPlan.application.command;

import lombok.Builder;

public record WriteCommentCommand(String hostComment, Integer travelPlanId, Integer memberId) {

	@Builder
	public WriteCommentCommand {
	}

	public void validate() {
		if (hostComment == null) {
			throw new IllegalArgumentException("댓글 내용은 반드시 입력해야 합니다.");
		}

		if (travelPlanId == null) {
			throw new IllegalArgumentException("여행 계획 ID는 필수 입력값입니다.");
		}
	}
}
