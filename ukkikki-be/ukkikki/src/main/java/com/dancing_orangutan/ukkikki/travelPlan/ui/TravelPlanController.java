package com.dancing_orangutan.ukkikki.travelPlan.ui;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.UpdateTravelPlanStatusCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchSuggestedTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.JoinTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.UpdateTravelPlanStatusRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.application.TravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.FetchSuggestedTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.SearchTravelPlanResponse;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/travel-plans")
@RequiredArgsConstructor
@Slf4j
public class TravelPlanController {

	private final TravelPlanService travelPlanService;

	@PostMapping
	public ApiUtils.ApiResponse<CreateTravelPlanResponse> createTravelPlan(
			@RequestBody CreateTravelPlanRequest request, @AuthenticationPrincipal MemberUserDetails memberUserDetails) {
		CreateTravelPlanCommand command = request.toCommand(memberUserDetails.getMemberId());

		return ApiUtils.success(travelPlanService.createTravelPlan(command));
	}

	@PostMapping("/{travelPlanId}")
	public ApiUtils.ApiResponse<JoinTravelPlanResponse> joinTravelPlan(
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails,
			@RequestBody JoinTravelPlanRequest request) {

		JoinTravelPlanCommand command = request.requestToDomain(memberUserDetails.getMemberId(),
				travelPlanId);

		return ApiUtils.success(travelPlanService.joinTravelPlan(command));
	}

	@GetMapping("/search")
	public ApiUtils.ApiResponse<SearchTravelPlanResponse> searchTravelPlan(
			@RequestParam(value = "startDate")LocalDate startDate,
			@RequestParam(value = "endDate") LocalDate endDate,
			@RequestParam(value = "departureCityId") Integer departureCityId,
			@RequestParam(value = "arrivalCityId") Integer arrivalCityId,
			@RequestParam(value ="keyword",required = false) List<Integer> keywords,
			@RequestParam(value = "status",required = false)PlanningStatus status){

		SearchTravelPlanQuery searchQuery = SearchTravelPlanQuery
				.builder()
				.startDate(startDate)
				.endDate(endDate)
				.departureCityId(departureCityId)
				.arrivalCityId(arrivalCityId)
				.keywords(keywords)
				.status(status)
				.build();

		searchQuery.validate();

		return ApiUtils.success(travelPlanService.searchTravelPlan(searchQuery));
	}

	//여행사 제안받은 여행 계획서 조회
	@GetMapping("/list")
	public ApiUtils.ApiResponse<FetchSuggestedTravelPlanResponse> fetchSuggestedTravelPlans(){
		FetchSuggestedTravelPlanQuery query = new FetchSuggestedTravelPlanQuery(PlanningStatus.BIDDING);
		return ApiUtils.success(travelPlanService.fetchSuggestedTravelPlans(query));
	}

	@PutMapping("/{travelPlanId}")
	public ApiUtils.ApiResponse<String> updateTravelPlanStatus(@PathVariable(name = "travelPlanId") Integer travelPlanId,
															   @RequestBody UpdateTravelPlanStatusRequest request) {
		UpdateTravelPlanStatusCommand command = UpdateTravelPlanStatusCommand.builder()
				.travelPlanId(travelPlanId)
				.planningStatus(request.planningStatus())
				.build();

		command.validate();

		travelPlanService.updateTravelPlanStatus(command);
		return ApiUtils.success("여행 계획 상태가 성공적으로 변경되었습니다.");
	}
}
