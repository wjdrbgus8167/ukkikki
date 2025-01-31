package com.dancing_orangutan.ukkikki.service;

import com.dancing_orangutan.ukkikki.travelPlan.application.TravelPlanService;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlan;
import com.dancing_orangutan.ukkikki.dto.travelPlan.response.CreateTravelPlanResponse;
import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.CityFinder;
import com.dancing_orangutan.ukkikki.travelPlan.infrastructure.TravelPlanRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("TravelPlanService 테스트")
class TravelPlanServiceTest {

	@Mock
	private CityFinder cityFinder;

	@Mock
	private TravelPlanRepository travelPlanRepository;

	@InjectMocks
	private TravelPlanService travelPlanService;

	@Test
	@DisplayName("여행 계획 생성 - 성공")
	void testCreateTravelPlan() {
		// Given
		Integer departureCityId = 1;
		Integer arrivalCityId = 2;
		CreateTravelPlanCommand command = CreateTravelPlanCommand.builder()
				.name("테스트 여행 계획")
				.startDate(LocalDate.of(2023, 1, 1))
				.endDate(LocalDate.of(2023, 1, 5))
				.minPeople(10)
				.maxPeople(100)
				.departureCityId(departureCityId)
				.arrivalCityId(arrivalCityId)
				.build();

		City departureCity = mock(City.class);
		City arrivalCity = mock(City.class);

		when(cityFinder.findById(departureCityId)).thenReturn(departureCity);
		when(cityFinder.findById(arrivalCityId)).thenReturn(arrivalCity);

		TravelPlan savedDomain = TravelPlan.builder()
				.travelPlanId(0)
				.name(command.getName())
				.startDate(command.getStartDate())
				.endDate(command.getEndDate())
				.minPeople(command.getMinPeople())
				.maxPeople(command.getMaxPeople())
				.departureCity(departureCity)
				.arrivalCity(arrivalCity)
				.planningStatus(PlanningStatus.IN_PROGRESS)
				.build();

		when(travelPlanRepository.save(any(TravelPlan.class))).thenReturn(savedDomain);

		// When
		CreateTravelPlanResponse response = travelPlanService.createTravelPlan(command);

		// Then
		CreateTravelPlanResponse.TravelPlanResponse travelPlanResponse = response.getTravelPlan();
		assertThat(travelPlanResponse.getArrivalCityId()).isEqualTo(savedDomain.getTravelPlanId());
		assertThat(travelPlanResponse.getMaxPeople()).isEqualTo(command.getMaxPeople());
		assertThat(travelPlanResponse.getMinPeople()).isEqualTo(command.getMinPeople());
		assertThat(travelPlanResponse.getStartDate()).isEqualTo(command.getStartDate());
		assertThat(travelPlanResponse.getEndDate()).isEqualTo(command.getEndDate());
		assertThat(travelPlanResponse.getPlanningStatus()).isEqualTo(PlanningStatus.IN_PROGRESS);
	}

	@Test
	@DisplayName("존재하지 않는 도착 도시 코드 - 예외")
	void testCreateTravelPlan_InvalidDepartureCityId() {
		// Given
		Integer invalidDepartureCityId = 999;
		Integer arrivalCityId = 2;
		CreateTravelPlanCommand command = CreateTravelPlanCommand.builder()
				.name("테스트 여행 계획")
				.startDate(LocalDate.of(2023, 1, 1))
				.endDate(LocalDate.of(2023, 1, 5))
				.minPeople(10)
				.maxPeople(100)
				.departureCityId(invalidDepartureCityId)
				.arrivalCityId(arrivalCityId)
				.build();

		when(cityFinder.findById(invalidDepartureCityId)).thenThrow(new IllegalArgumentException("해당 도시가 존재하지 않습니다. : " + invalidDepartureCityId));

		// When & Then
		assertThrows(IllegalArgumentException.class, () -> travelPlanService.createTravelPlan(command));
	}

	@Test
	@DisplayName("존재하지 않는 출발 도시 코드 - 예외")
	void createTravelPlan_InvalidArrivalCityId_ThrowsException() {
		// Given
		Integer invalidArrivalCityId = 999;
		Integer departureCityId = 2;
		CreateTravelPlanCommand command = CreateTravelPlanCommand.builder()
				.name("테스트 여행 계획")
				.startDate(LocalDate.of(2023, 1, 1))
				.endDate(LocalDate.of(2023, 1, 5))
				.minPeople(10)
				.maxPeople(100)
				.departureCityId(departureCityId)
				.arrivalCityId(invalidArrivalCityId)
				.build();
		when(cityFinder.findById(departureCityId)).thenReturn(mock(City.class));
		when(cityFinder.findById(invalidArrivalCityId)).thenThrow(new IllegalArgumentException("해당 도시가 존재하지 않습니다. : " + invalidArrivalCityId));

		// When & Then
		assertThrows(IllegalArgumentException.class, () -> travelPlanService.createTravelPlan(command));
	}
}