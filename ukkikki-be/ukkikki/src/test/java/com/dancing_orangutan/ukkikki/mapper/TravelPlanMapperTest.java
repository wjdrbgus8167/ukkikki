package com.dancing_orangutan.ukkikki.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import com.dancing_orangutan.ukkikki.domain.TravelPlanDomain;
import com.dancing_orangutan.ukkikki.entity.info.City;
import com.dancing_orangutan.ukkikki.entity.travelPlan.PlanningStatus;
import com.dancing_orangutan.ukkikki.entity.travelPlan.TravelPlan;
import java.time.LocalDate;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@DisplayName("TravelPlanMapper 테스트")
public class TravelPlanMapperTest {

	@Autowired
	private TravelPlanMapper travelPlanMapper;

	@Test
	@DisplayName("도메인 에서 Entity 매핑")
	void testDomainToEntityMapping() {
		// Given
		TravelPlanDomain domain = TravelPlanDomain.builder()
				.name("테스트 여행")
				.startDate(LocalDate.of(2025, 2, 1))
				.startDate(LocalDate.of(2025, 2, 2))
				.arrivalCity(City.builder()
						.cityId(1)
						.cityName("서울")
						.build())
				.departureCity(City.builder()
						.cityId(2)
						.cityName("도쿄")
						.build())
				.minPeople(10)
				.maxPeople(100)
				.build();

		// When
		TravelPlan entity = travelPlanMapper.domainToEntity(domain);

		// Then
		assertThat(entity.getName()).isEqualTo(domain.getName());
		assertThat(entity.getEndDate()).isEqualTo(domain.getEndDate());
		assertThat(entity.getStartDate()).isEqualTo(domain.getStartDate());
		assertThat(entity.getMinPeople()).isEqualTo(domain.getMinPeople());
		assertThat(entity.getMaxPeople()).isEqualTo(domain.getMaxPeople());
		assertThat(entity.getArrivalCity().getCityName()).isEqualTo(domain.getArrivalCity().getCityName());
		assertThat(entity.getDepartureCity().getCityName()).isEqualTo(domain.getDepartureCity().getCityName());
	}

	@Test
	@DisplayName("Entity 에서 Domain 매핑")
	void testEntityToDomain() {
		// Given
		TravelPlan entity = TravelPlan.builder()
				.name("겨울 여행")
				.travelPlanId(1)
				.endDate(LocalDate.of(2025, 02, 02))
				.startDate(LocalDate.of(2025, 02, 01))
				.arrivalCity(City.builder()
						.cityId(1)
						.cityName("서울")
						.build())
				.departureCity(City.builder()
						.cityId(2)
						.cityName("도쿄")
						.build())
				.planningStatus(PlanningStatus.IN_PROGRESS)
				.minPeople(1)
				.maxPeople(10)
				.build();

		// When
		TravelPlanDomain domain = travelPlanMapper.entityToDomain(entity);

		// Then
		assertThat(domain.getName()).isEqualTo(entity.getName());
		assertThat(domain.getTravelPlanId()).isEqualTo(entity.getTravelPlanId());
		assertThat(domain.getMinPeople()).isEqualTo(entity.getMinPeople());
		assertThat(domain.getMaxPeople()).isEqualTo(entity.getMaxPeople());
		assertThat(domain.getPlanningStatus()).isEqualTo(entity.getPlanningStatus());
		assertThat(domain.getArrivalCity().getCityName()).isEqualTo(entity.getArrivalCity().getCityName());
		assertThat(domain.getDepartureCity().getCityName()).isEqualTo(entity.getDepartureCity().getCityName());
	}

}