package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;

public interface CreateTravelPlanService {

	Integer createTravelPlan(CreateTravelPlanCommand command);

}
