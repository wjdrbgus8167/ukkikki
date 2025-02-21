package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import com.dancing_orangutan.ukkikki.geography.domain.city.CityRepository;
import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.travelPlan.application.command.CreateTravelPlanCommand;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordRepository;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TravelPlanFactory {

	private final KeywordRepository keywordRepository;
	private final CityRepository cityRepository;

	public TravelPlanEntity createEntity(final CreateTravelPlanCommand command) {
		List<KeywordEntity> keywordEntities = keywordRepository.findByKeywordIdIn(
				command.travelPlanCommand().keywords());
		CityEntity arrivalCityEntity = cityRepository.findById(
						command.travelPlanCommand().arrivalCity().cityId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.CITY_NOT_FOUND));
		CityEntity departureCityEntity = cityRepository.findById(
						command.travelPlanCommand().departureCity().cityId())
				.orElseThrow(() -> new ApiException(
						ErrorCode.CITY_NOT_FOUND));

		return TravelPlanEntity.builder()
				.name(command.travelPlanCommand().name())
				.startDate(command.travelPlanCommand().startDate())
				.endDate(command.travelPlanCommand().endDate())
				.planningStatus(command.travelPlanCommand().planningStatus())
				.minPeople(command.travelPlanCommand().minPeople())
				.maxPeople(command.travelPlanCommand().maxPeople())
				.departureCity(departureCityEntity)
				.arrivalCity(arrivalCityEntity)
				.keywordEntities(keywordEntities)
				.build();
	}
}
