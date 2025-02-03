package com.dancing_orangutan.ukkikki.travelPlan.application;


import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.JoinTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse.TravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.TravelPlanRepository;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.JoinTravelPlanResponse;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlanService {

	private final TravelPlanRepository travelPlanRepository;

	@Transactional
	public CreateTravelPlanResponse createTravelPlan(CreateTravelPlanCommand command) {

		List<Integer> keywords = command.getKeywords().stream()
				.map(CreateTravelPlanCommand.KeywordCommand::getKeywordId)
				.toList();

		TravelPlan domain = TravelPlan.builder()
				.departureCityId(command.getDepartureCityId())
				.arrivalCityId(command.getArrivalCityId())
				.name(command.getName())
				.endDate(command.getEndDate())
				.startDate(command.getStartDate())
				.planningStatus(command.getPlanningStatus())
				.minPeople(command.getMinPeople())
				.maxPeople(command.getMaxPeople())
				.keywords(keywords)
				.memberId(command.getMemberId())
				.adultCount(command.getAdultCount())
				.infantCount(command.getInfantCount())
				.childCount(command.getChildCount())
				.build();

		TravelPlan savedTravelPlan = travelPlanRepository.save(domain);

		return CreateTravelPlanResponse.builder()
				.travelPlan(TravelPlanResponse.builder()
						.travelPlanId(savedTravelPlan.getTravelPlanId())
						.name(savedTravelPlan.getName())
						.departureCityId(savedTravelPlan.getDepartureCityId())
						.arrivalCityId(savedTravelPlan.getArrivalCityId())
						.startDate(savedTravelPlan.getStartDate())
						.endDate(savedTravelPlan.getEndDate())
						.planningStatus(savedTravelPlan.getPlanningStatus())
						.minPeople(savedTravelPlan.getMinPeople())
						.maxPeople(savedTravelPlan.getMaxPeople())
						.build()
				).build();
	}

	public TravelPlanRead joinTravelPlan(JoinTravelPlanCommand command) {

		TravelPlan domain = TravelPlan.builder()
				.adultCount(command.getAdultCount())
				.childCount(command.getChildCount())
				.infantCount(command.getInfantCount())
				.memberId(command.getMemberId())
				.travelPlanId(command.getTravelPlanId())
				.build();

		return travelPlanRepository.joinTravelPlan(domain);
	}

}
