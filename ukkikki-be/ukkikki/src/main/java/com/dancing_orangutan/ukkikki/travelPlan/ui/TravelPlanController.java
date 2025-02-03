package com.dancing_orangutan.ukkikki.travelPlan.ui;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.JoinTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.global.response.ApiUtils;
import com.dancing_orangutan.ukkikki.global.response.ApiUtils.ApiResponse;
import com.dancing_orangutan.ukkikki.travelPlan.application.TravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
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
			@RequestBody CreateTravelPlanRequest request,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {
		CreateTravelPlanCommand command = request.toCommand(memberUserDetails.getMemberId());

		return ApiUtils.success(travelPlanService.createTravelPlan(command));
	}

	@PostMapping("/{travelPlanId}")
	public ApiResponse<JoinTravelPlanResponse> joinTravelPlan(
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails,
			@RequestBody JoinTravelPlanRequest request) {

		JoinTravelPlanCommand command = request.requestToDomain(memberUserDetails.getMemberId(),
				travelPlanId);

		return ApiUtils.success(travelPlanService.joinTravelPlan(command));
	}
}
