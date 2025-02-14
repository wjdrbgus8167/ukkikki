package com.dancing_orangutan.ukkikki.travelPlan.ui.web;

import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.TravelPlanServiceFacade;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.*;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchSuggestedTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.SearchTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchAvailableTravelPlansResponse;
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

	private final TravelPlanServiceFacade travelPlanServiceFacade;

	@PostMapping
	public ApiUtils.ApiResponse<CreateTravelPlanResponse> createTravelPlan(
			@RequestBody CreateTravelPlanRequest request,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		return ApiUtils.success(
				travelPlanServiceFacade.createTravelPlan(request, memberUserDetails.getMemberId()));
	}

	@PostMapping("/{travelPlanId}")
	public ApiUtils.ApiResponse<JoinTravelPlanResponse> joinTravelPlan(
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails,
			@RequestBody JoinTravelPlanRequest request) {

		return ApiUtils.success(
				travelPlanServiceFacade.joinTravelPlan(request, memberUserDetails.getMemberId(),
						travelPlanId));
	}

	@GetMapping("/search")
	public ApiUtils.ApiResponse<SearchTravelPlanResponse> searchTravelPlan(
			@RequestParam(value = "startDate") LocalDate startDate,
			@RequestParam(value = "endDate") LocalDate endDate,
			@RequestParam(value = "departureCityId") Integer departureCityId,
			@RequestParam(value = "arrivalCityId") Integer arrivalCityId,
			@RequestParam(value = "keyword", required = false) List<Integer> keywords,
			@RequestParam(value = "status", required = false) PlanningStatus status,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		return ApiUtils.success(
				travelPlanServiceFacade.searchTravelPlans(startDate, endDate, departureCityId,
						arrivalCityId, keywords, status, memberUserDetails.getMemberId()));
	}

	@GetMapping("/list")
	public ApiUtils.ApiResponse<FetchSuggestedTravelPlansResponse> fetchSuggestedTravelPlans() {
		return ApiUtils.success(travelPlanServiceFacade.fetchSuggestedTravelPlans());
	}

	@PutMapping("/{travelPlanId}/comments")
	public ApiUtils.ApiResponse<String> writeComments(@RequestBody WriteCommentRequest request,
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		travelPlanServiceFacade.writeComment(request, travelPlanId,
				memberUserDetails.getMemberId());
		return ApiUtils.success("코멘트가 성공적으로 등록되었습니다.");
	}

	@PutMapping("/{travelPlanId}/closeTime")
	public ApiUtils.ApiResponse<String> updateCloseTime(@RequestBody UpdateCloseTimeRequest request,
			@PathVariable(name = "travelPlanId") Integer travelPlanId,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		travelPlanServiceFacade.updateCloseTime(request, travelPlanId, memberUserDetails
				.getMemberId());
		return ApiUtils.success("마감일시가 성공적으로 등록되었습니다.");
	}

	@PutMapping("/{travelPlanId}/companion")
	public ApiUtils.ApiResponse<String> updateCompanionCount(
			@RequestBody UpdateCompanionCountRequest request
			, @PathVariable(name = "travelPlanId") Integer travelPlanId
			, @AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		travelPlanServiceFacade.updateCompanionCount(request, travelPlanId,
				memberUserDetails.getMemberId());
		return ApiUtils.success("인원이 성공적으로 변경되었습니다.");
	}

	@GetMapping
	public ApiUtils.ApiResponse<FetchAvailableTravelPlansResponse> fetchAvailableTravelPlans(
			Pageable pageable) {
		return ApiUtils.success(travelPlanServiceFacade.fetchAvailableTravelPlans(pageable));
	}

	@GetMapping("/{travelPlanId}")
	public ApiUtils.ApiResponse<FetchTravelPlanDetailsResponse> getTravelPlanDetails(
			@PathVariable(name = "travelPlanId") Integer travelPlanId) {
		return ApiUtils.success(travelPlanServiceFacade.fetchTravelPlanDetails(travelPlanId));
	}

	@GetMapping("/keywords")
	public ApiUtils.ApiResponse<FetchKeywordsResponse> fetchKeywords() {
		return ApiUtils.success(travelPlanServiceFacade.fetchKeywords());
	}

	@PutMapping("/{travelPlanId}/exit")
	public ApiUtils.ApiResponse<String> exitTravelPlan(
			@AuthenticationPrincipal MemberUserDetails memberUserDetails,
			@PathVariable(name = "travelPlanId") Integer travelPlanId) {

		travelPlanServiceFacade.exitTravelPlan(travelPlanId, memberUserDetails.getMemberId());
		return ApiUtils.success("여행계획이 성공적으로 퇴장되었습니다.");
	}

	@GetMapping("/my-search")
	public ApiUtils.ApiResponse<SearchMyTravelPlanResponse> searchMyTravelPlans(
			@RequestParam(value = "status", required = false) PlanningStatus status,
			@AuthenticationPrincipal MemberUserDetails memberUserDetails) {

		return ApiUtils.success(
				travelPlanServiceFacade.searchMyTravelPlans(status, memberUserDetails.getMemberId()));
	}
}
