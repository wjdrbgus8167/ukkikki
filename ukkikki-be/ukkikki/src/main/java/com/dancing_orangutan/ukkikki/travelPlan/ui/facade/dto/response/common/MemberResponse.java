package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;


import lombok.Builder;

public record MemberResponse(String name, boolean hostYn, int totalPeopleCount) {

	@Builder
	public MemberResponse{

	}
}
