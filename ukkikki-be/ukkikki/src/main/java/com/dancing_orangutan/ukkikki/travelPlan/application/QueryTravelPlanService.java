package com.dancing_orangutan.ukkikki.travelPlan.application;

import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchAvailableTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.FetchTravelPlanDetailsQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchMyTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.application.query.SearchTravelPlanQuery;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import java.util.List;
import org.springframework.data.domain.Page;

public interface QueryTravelPlanService {

	TravelPlanEntity findWithRelationsByTravelPlanId(Integer travelPlanId);

	List<TravelPlanEntity> searchTravelPlans(SearchTravelPlanQuery query);

	List<TravelPlanEntity> fetchSuggestedTravelPlans();


	Page<TravelPlanEntity> fetchAvailableTravelPlans(FetchAvailableTravelPlanQuery query);

	TravelPlanEntity fetchTravelPlanDetails(FetchTravelPlanDetailsQuery query);

	List<KeywordEntity> fetchKeywords();

	List<TravelPlanEntity> searchMyTravelPlans(SearchMyTravelPlanQuery query);
}
