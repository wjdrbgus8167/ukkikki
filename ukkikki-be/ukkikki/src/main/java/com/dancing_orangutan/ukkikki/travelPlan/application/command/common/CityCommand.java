package com.dancing_orangutan.ukkikki.travelPlan.application.command.common;

import lombok.Builder;

public record CityCommand(Integer cityId) {


	@Builder
	public CityCommand{

	}
}
