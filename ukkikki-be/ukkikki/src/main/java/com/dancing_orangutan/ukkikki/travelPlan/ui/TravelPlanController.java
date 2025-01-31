package com.dancing_orangutan.ukkikki.travelPlan.ui;

import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.dto.travelPlan.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.global.response.ApiUtils;
import com.dancing_orangutan.ukkikki.global.response.ApiUtils.ApiResponse;
import com.dancing_orangutan.ukkikki.travelPlan.application.TravelPlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/travel-plans")
@RequiredArgsConstructor
public class TravelPlanController {

	private final TravelPlanService travelPlanService;

	@PostMapping
	public ApiResponse<CreateTravelPlanResponse> createTravelPlan(
			@RequestBody CreateTravelPlanRequest request) {
		CreateTravelPlanCommand command = request.toCommand();

		return ApiUtils.success(travelPlanService.createTravelPlan(command));
	}
}
