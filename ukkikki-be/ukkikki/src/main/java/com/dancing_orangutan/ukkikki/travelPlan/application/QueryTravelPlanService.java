package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchAllTravelPlansQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchAvailableTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchTravelPlanDetailsQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchTravelPlanDetailsQueryByMember;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchMyTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import java.util.List;
import org.springframework.data.domain.Page;

public interface QueryTravelPlanService {

	TravelPlanEntity findWithRelationsByTravelPlanId(Integer travelPlanId);

	List<TravelPlanEntity> searchTravelPlans(SearchTravelPlanQuery query);

	List<TravelPlanEntity> fetchSuggestedTravelPlans(Integer companyId);

	Page<TravelPlanEntity> fetchAvailableTravelPlans(FetchAvailableTravelPlanQuery query);

	Page<TravelPlanEntity> fetchAllTravelPlans(FetchAllTravelPlansQuery query);

	TravelPlanEntity fetchTravelPlanDetails(FetchTravelPlanDetailsQuery query);

	TravelPlanEntity fetchTravelPlanDetailsByMember(FetchTravelPlanDetailsQueryByMember query);

	List<KeywordEntity> fetchKeywords();

	List<TravelPlanEntity> searchMyTravelPlans(SearchMyTravelPlanQuery query);

	boolean fetchCanVote(Integer travelPlanId);

	VoteSurveyEntity fetchVoteSurveyEntity(Integer travelPlanId);

}
