package com.dancing_orangutan.ukkikki.service;


import com.dancing_orangutan.ukkikki.command.travelPlan.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.domain.TravelPlanDomain;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse.TravelPlanResponse;
import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.repository.city.CityFinder;
import com.dancing_orangutan.ukkikki.repository.travelPlan.TravelPlanRepository;
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

		TravelPlanDomain domain = TravelPlanDomain.builder()
				.name(command.getName())
				.startDate(command.getStartDate())
				.endDate(command.getEndDate())
				.minPeople(command.getMinPeople())
				.maxPeople(command.getMaxPeople())
				.departureCity(departureCity)
				.arrivalCity(arrivalCity)
				.planningStatus(command.getPlanningStatus())
				.build();

		TravelPlanDomain savedTravelPlan = travelPlanRepository.save(domain);

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
