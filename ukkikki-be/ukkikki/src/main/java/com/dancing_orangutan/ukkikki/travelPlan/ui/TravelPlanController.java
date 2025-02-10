package com.dancing_orangutan.ukkikki.travelPlan.ui;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.*;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchSuggestedTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.*;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.application.TravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.FetchSuggestedTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.SearchTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.FetchAllTravelPlansResponse;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
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
			@RequestBody CreateTravelPlanRequest request,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {
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
			@RequestParam(value = "startDate") LocalDate startDate,
			@RequestParam(value = "endDate") LocalDate endDate,
			@RequestParam(value = "departureCityId") Integer departureCityId,
			@RequestParam(value = "arrivalCityId") Integer arrivalCityId,
			@RequestParam(value = "keyword", required = false) List<Integer> keywords,
			@RequestParam(value = "status", required = false) PlanningStatus status) {

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
	public ApiUtils.ApiResponse<FetchSuggestedTravelPlansResponse> fetchSuggestedTravelPlans() {
		FetchSuggestedTravelPlanQuery query = new FetchSuggestedTravelPlanQuery(
				PlanningStatus.BIDDING);
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


	@PutMapping("/{travelPlanId}/comments")
	public ApiUtils.ApiResponse<String> writeComments(@RequestBody WriteCommentRequest request,
			@PathVariable(name = "travelPlanId") Integer travelPlanId) {
		WriteCommentCommand command = WriteCommentCommand.builder()
				.travelPlanId(travelPlanId)
				.hostComment(request.hostComment())
				.build();
		command.validate();

		travelPlanService.writeComment(command);

		return ApiUtils.success("코멘트가 성공적으로 등록되었습니다.");
	}

	@PutMapping("/{travelPlanId}/closeTime")
	public ApiUtils.ApiResponse<String> updateCloseTime(@RequestBody UpdateCloseTimeRequest request,
			@PathVariable(name = "travelPlanId") Integer travelPlanId) {

		UpdateCloseTimeCommand command = UpdateCloseTimeCommand.builder()
				.closeTime(request.closeTime())
				.travelPlanId(travelPlanId)
				.build();

		command.validate();
		travelPlanService.updateCloseTime(command);
		return ApiUtils.success("마감일시가 성공적으로 등록되었습니다.");
	}

	@PutMapping("/{travelPlanId}/companion")
	public ApiUtils.ApiResponse<String> updateHost(@RequestBody UpdateHostRequest request
			, @PathVariable(name = "travelPlanId") Integer travelPlanId
			, @AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		UpdateHostCommand command = UpdateHostCommand.builder()
				.travelPlanId(travelPlanId)
				.memberId(memberUserDetails.getMemberId())
				.childCount(request.childCount())
				.infantCount(request.infantCount())
				.adultCount(request.adultCount())
				.build();

		command.validate();

		travelPlanService.updateHost(command);
		return ApiUtils.success("인원이 성공적으로 변경되었습니다.");
	}

	@GetMapping
	public ApiUtils.ApiResponse<FetchAllTravelPlansResponse> getAllTravelPlans(Pageable pageable) {
		return  ApiUtils.success(travelPlanService.getAllTravelPlans(pageable));
	}

	@GetMapping("/{travelPlanId}")
	public ApiUtils.ApiResponse<FetchSuggestedTravelPlanDetailsResponse> getTravelPlanDetails(@PathVariable(name = "travelPlanId") Integer travelPlanId) {
		return ApiUtils.success(travelPlanService.fetchTravelPlanDetails(travelPlanId));
	}

	@GetMapping("/keywords")
	public ApiUtils.ApiResponse<GetKeywordsResponse> getKeywords() {
		GetKeywordsResponse response = travelPlanService.getKeywords();
		return ApiUtils.success(response);
	}

}
