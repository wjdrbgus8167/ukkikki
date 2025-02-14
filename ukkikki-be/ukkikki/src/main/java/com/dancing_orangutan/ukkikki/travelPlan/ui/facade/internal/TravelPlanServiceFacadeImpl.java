package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.internal;

import com.dancing_orangutan.ukkikki.travelPlan.application.CreateTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.ExitTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.JoinTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.QueryTravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.UpdateCloseTimeService;
import com.dancing_orangutan.ukkikki.travelPlan.application.UpdateCompanionCountService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.ExitTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchAvailableTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchTravelPlanDetailsQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchTravelPlanDetailsQueryByMember;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchMyTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.WriteCommentService;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.TravelPlanServiceFacade;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.JoinTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.UpdateCloseTimeRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.UpdateCompanionCountRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.WriteCommentRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchAvailableTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchKeywordsResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchSuggestedTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchTravelPlanDetailsByMemberResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchTravelPlanDetailsByCompanyResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.SearchTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.internal.mapper.TravelPlanResponseMapper;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;


@Component
@RequiredArgsConstructor
public class TravelPlanServiceFacadeImpl implements TravelPlanServiceFacade {

	private final CreateTravelPlanService createTravelPlanService;
	private final QueryTravelPlanService queryTravelPlanService;
	private final JoinTravelPlanService joinTravelPlanService;
	private final WriteCommentService writeCommentService;
	private final UpdateCloseTimeService updateCloseTimeService;
	private final UpdateCompanionCountService updateCompanionCountService;
	private final ExitTravelPlanService exitTravelPlanService;
	private final TravelPlanResponseMapper mapper;

	@Override
	public CreateTravelPlanResponse createTravelPlan(final CreateTravelPlanRequest request,
			final Integer memberId) {
		Integer travelPlanId = createTravelPlanService.createTravelPlan(
				request.toCommand(memberId));

		return mapper.createTravelPlanResponse(
				queryTravelPlanService.findWithRelationsByTravelPlanId(travelPlanId));
	}

	@Override
	public JoinTravelPlanResponse joinTravelPlan(final JoinTravelPlanRequest request, final Integer memberId,
			final Integer travelPlanId) {

		Integer joinedTravelPlanId = joinTravelPlanService.joinTravelPlan(
				request.toCommand(memberId, travelPlanId));
		TravelPlanEntity entity = queryTravelPlanService.findWithRelationsByTravelPlanId(
				joinedTravelPlanId);

		return mapper.joinTravelPlanResponse(entity,memberId);
	}

	@Override
	public void writeComment(final WriteCommentRequest request, final Integer travelPlanId,
			final Integer memberId) {
		writeCommentService.writeComment(request.toCommand(memberId, travelPlanId));
	}

	@Override
	public void updateCloseTime(final UpdateCloseTimeRequest request, final Integer travelPlanId,
			final Integer memberId) {
		updateCloseTimeService.updateCloseTIme(request.toCommand(memberId, travelPlanId));
	}

	@Override
	public void updateCompanionCount(final UpdateCompanionCountRequest request,
			final Integer travelPlanId,
			final Integer memberId) {
		updateCompanionCountService.updateCompanionCount(request.toCommand(memberId, travelPlanId));
	}

	@Override
	public void exitTravelPlan(final Integer travelPlanId, final Integer memberId) {
		ExitTravelPlanCommand command = ExitTravelPlanCommand.builder()
				.travelPlanId(travelPlanId)
				.memberId(memberId)
				.build();
		exitTravelPlanService.exitTravelPlan(command);
	}

	@Override
	public SearchMyTravelPlanResponse searchMyTravelPlans(final PlanningStatus status, final Integer memberId) {
		final SearchMyTravelPlanQuery query = SearchMyTravelPlanQuery.builder()
				.status(status)
				.memberId(memberId)
				.build();

		return mapper.searchMyTravelPlanResponse(queryTravelPlanService.searchMyTravelPlans(query),memberId);
	}

	@Override
	public FetchAvailableTravelPlansResponse fetchAvailableTravelPlans(final Pageable pageable) {
		return mapper.fetchAvailableTravelPlansResponse(
				queryTravelPlanService.fetchAvailableTravelPlans(
						FetchAvailableTravelPlanQuery.builder()
								.pageable(pageable)
								.build()));
	}

	@Override
	public FetchTravelPlanDetailsByCompanyResponse fetchTravelPlanDetails(final Integer travelPlanId) {
		return mapper.fetchTravelPlanDetailsResponse(
				queryTravelPlanService.fetchTravelPlanDetails(FetchTravelPlanDetailsQuery.builder()
						.travelPlanId(travelPlanId)
						.build()));
	}

	@Override
	public FetchTravelPlanDetailsByMemberResponse fetchTravelPlanDetailsByMember(
			Integer travelPlanId, Integer memberId) {
		TravelPlanEntity entity = queryTravelPlanService.fetchTravelPlanDetailsByMember(
				FetchTravelPlanDetailsQueryByMember.builder()
						.memberId(memberId)
						.travelPlanId(travelPlanId)
						.build());

		return mapper.fetchTravelPlanDetailsByMemberResponse(entity, memberId);
	}

	@Override
	public SearchTravelPlanResponse searchTravelPlans(final LocalDate startDate,
			final LocalDate endDate,
			final Integer departureCityId, final Integer arrivalCityId,
			final List<Integer> keywords,
			final PlanningStatus planningStatus,
			final Integer memberId) {
		final SearchTravelPlanQuery query = SearchTravelPlanQuery.builder()
				.startDate(startDate)
				.endDate(endDate)
				.departureCityId(departureCityId)
				.arrivalCityId(arrivalCityId)
				.status(planningStatus)
				.keywords(keywords)
				.build();

		return mapper.searchTravelPlanResponse(queryTravelPlanService.searchTravelPlans(query),memberId);
	}

	@Override
	public FetchSuggestedTravelPlansResponse fetchSuggestedTravelPlans() {
		return mapper.fetchSuggestedTravelPlansResponse(
				queryTravelPlanService.fetchSuggestedTravelPlans());
	}

	@Override
	public FetchKeywordsResponse fetchKeywords() {
		return mapper.fetchKeywordsResponse(queryTravelPlanService.fetchKeywords());
	}
}
