package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;

public record JoinTravelPlanRequest(
		int adultCount,
		int childCount,
		int infantCount
) {
	public JoinTravelPlanCommand toCommand(Integer memberId, Integer travelPlanId) {
		validate(memberId, travelPlanId);
		return JoinTravelPlanCommand.builder()
				.adultCount(adultCount)
				.childCount(childCount)
				.infantCount(infantCount)
				.travelPlanId(travelPlanId)
				.memberId(memberId)
				.build();
	}

	private void validate(Integer memberId, Integer travelPlanId) {
		if (travelPlanId == null || travelPlanId <= 0) {
			throw new IllegalArgumentException("여행 계획 ID는 양수여야 합니다.");
		}
		if (memberId == null || memberId <= 0) {
			throw new IllegalArgumentException("회원 ID는 양수여야 합니다.");
		}
		if (adultCount < 0 || childCount < 0 || infantCount < 0) {
			throw new IllegalArgumentException("인원 수는 음수일 수 없습니다.");
		}
		if ((adultCount + childCount + infantCount) < 1) {
			throw new IllegalArgumentException("최소 1명 이상의 인원이 필요합니다.");
		}
	}
}
