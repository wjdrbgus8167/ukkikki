package com.dancing_orangutan.ukkikki.travelPlan.application;


import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordId;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.keyword.KeywordFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlanKeyword.TravelPlanKeywordRegistrant;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.CreateTravelPlanResponse.TravelPlanResponse;
import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.city.CityFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.travelPlan.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlanService {

	private final CityFinder cityFinder;
	private final TravelPlanRepository travelPlanRepository;
	private final KeywordFinder keywordFinder;
	private final TravelPlanKeywordRegistrant travelPlanKeywordRegistrant;

	public CreateTravelPlanResponse createTravelPlan(CreateTravelPlanCommand command) {

		CityEntity departureCity = cityFinder.findById(command.getDepartureCityId());
		CityEntity arrivalCity = cityFinder.findById(command.getArrivalCityId());

		TravelPlan domain = TravelPlan.builder()
				.name(command.getName())
				.startDate(command.getStartDate())
				.endDate(command.getEndDate())
				.minPeople(command.getMinPeople())
				.maxPeople(command.getMaxPeople())
				.departureCity(departureCity)
				.arrivalCity(arrivalCity)
				.planningStatus(command.getPlanningStatus())
				.build();

		TravelPlan savedTravelPlan = travelPlanRepository.save(domain);

		command.getKeywords()
				.stream()
				.map(keywordCommand -> keywordFinder.findById(keywordCommand.getKeywordId()))
				.forEach(keywordEntity -> {
					TravelPlanKeywordEntity travelPlanKeyword = TravelPlanKeywordEntity.builder()
									.travelPlanKeywordId(TravelPlanKeywordId.builder()
											.travelPlanId(savedTravelPlan.getTravelPlanId())
											.keywordId(keywordEntity.getKeywordId()).build())
											.build();
					travelPlanKeywordRegistrant.registerTravelPlanKeyword(travelPlanKeyword);
				});

		TravelPlanResponse response = TravelPlanResponse.builder()
				.travelPlanId(savedTravelPlan.getTravelPlanId())
				.name(savedTravelPlan.getName())
				.arrivalCityId(savedTravelPlan.getArrivalCity().getCityId())
				.departureCityId(savedTravelPlan.getDepartureCity().getCityId())
				.maxPeople(savedTravelPlan.getMaxPeople())
				.minPeople(savedTravelPlan.getMinPeople())
				.planningStatus(savedTravelPlan.getPlanningStatus())
				.startDate(savedTravelPlan.getStartDate())
				.endDate(savedTravelPlan.getEndDate())
				.build();

		return CreateTravelPlanResponse.builder().
				travelPlan(response)
				.build();
	}
}
