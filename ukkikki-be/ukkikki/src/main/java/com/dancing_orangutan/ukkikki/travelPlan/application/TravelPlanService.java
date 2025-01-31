package com.dancing_orangutan.ukkikki.travelPlan.application;


import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlan;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse.TravelPlanResponse;
import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.CityFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.TravelPlanRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class TravelPlanService {

	private final CityFinder cityFinder;
	private final TravelPlanRepository travelPlanRepository;

	public CreateTravelPlanResponse createTravelPlan(CreateTravelPlanCommand command) {

		City departureCity = cityFinder.findById(command.getDepartureCityId());
		City arrivalCity = cityFinder.findById(command.getArrivalCityId());

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
