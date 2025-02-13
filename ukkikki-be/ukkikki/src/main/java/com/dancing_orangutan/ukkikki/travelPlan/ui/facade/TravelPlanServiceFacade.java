package com.dancing_orangutan.ukkikki.travelPlan.ui.facade;

import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.CreateTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.JoinTravelPlanRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.UpdateCloseTimeRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.UpdateCompanionCountRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.request.WriteCommentRequest;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchAvailableTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchTravelPlanDetailsResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchSuggestedTravelPlansResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.FetchKeywordsResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.JoinTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.SearchTravelPlanResponse;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface TravelPlanServiceFacade {

	CreateTravelPlanResponse createTravelPlan(final CreateTravelPlanRequest request, final Integer memberId);

	JoinTravelPlanResponse joinTravelPlan(final JoinTravelPlanRequest request, final Integer memberId,
			final Integer travelPlanId);

	SearchTravelPlanResponse searchTravelPlans(final LocalDate startDate, final LocalDate endDate,
			final Integer departureCityId, final Integer arrivalCityId, final List<Integer> keywords,
			final PlanningStatus planningStatus, final Integer memberId);

	FetchSuggestedTravelPlansResponse fetchSuggestedTravelPlans();

	void writeComment(final WriteCommentRequest request, final Integer travelPlanId, final Integer memberId);

	void updateCloseTime(final UpdateCloseTimeRequest request, final Integer travelPlanId, final Integer memberId);

	void updateCompanionCount(final UpdateCompanionCountRequest request, final Integer travelPlanId,
			final Integer memberId);

	FetchAvailableTravelPlansResponse fetchAvailableTravelPlans(final Pageable pageable);

	FetchTravelPlanDetailsResponse fetchTravelPlanDetails(final Integer travelPlanId);

	FetchKeywordsResponse fetchKeywords();

	void exitTravelPlan(Integer travelPlanId, Integer memberId);
}
