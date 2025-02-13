package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;

public interface JoinTravelPlanService {

	Integer joinTravelPlan(JoinTravelPlanCommand command);

}
