package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateTravelPlanStatusCommand;

public interface UpdatePlanningStatusService {

	void updatePlanningStatus(UpdateTravelPlanStatusCommand command);

}
