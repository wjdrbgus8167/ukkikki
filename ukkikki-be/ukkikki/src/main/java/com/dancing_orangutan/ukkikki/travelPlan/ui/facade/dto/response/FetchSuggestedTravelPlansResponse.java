package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public record FetchSuggestedTravelPlansResponse(
		@JsonProperty("travelPlans") List<TravelPlanResponse> travelPlans
) {
	public static FetchSuggestedTravelPlansResponse fromEntities(List<TravelPlanEntity> entities) {
		return FetchSuggestedTravelPlansResponse.builder()
				.travelPlans(entities.stream()
						.map(TravelPlanResponse::fromEntity)
						.collect(Collectors.toList()))
				.build();
	}

	@Builder
	public FetchSuggestedTravelPlansResponse {}

	@Builder
	private record TravelPlanResponse(
			Integer travelPlanId,
			String name,
			CityResponse arrivalCity,
			CityResponse departureCity,
			LocalDate startDate,
			LocalDate endDate,
			PlanningStatus planningStatus,
			int minPeople,
			int maxPeople,
			int currentParticipants,
			List<KeywordResponse> keywords
	) {
		private static TravelPlanResponse fromEntity(TravelPlanEntity entity) {
			return TravelPlanResponse.builder()
					.travelPlanId(entity.getTravelPlanId())
					.name(entity.getName())
					.arrivalCity(CityResponse.fromEntity(entity.getArrivalCity()))
					.departureCity(CityResponse.fromEntity(entity.getDepartureCity()))
					.startDate(entity.getStartDate())
					.endDate(entity.getEndDate())
					.planningStatus(entity.getPlanningStatus())
					.minPeople(entity.getMinPeople())
					.maxPeople(entity.getMaxPeople())
					.currentParticipants(entity.calCurrentParticipants())
					.keywords(entity.getTravelPlanKeywords().stream()
							.map(travelPlanKeywordEntity -> KeywordResponse.fromEntity(travelPlanKeywordEntity.getKeyword()))
							.collect(Collectors.toList()))
					.build();
		}
	}

	@Builder
	private record CityResponse(
			Integer cityId,
			String name
	) {
		private static CityResponse fromEntity(CityEntity entity) {
			return CityResponse.builder()
					.cityId(entity.getCityId())
					.name(entity.getName())
					.build();
		}
	}

	@Builder
	private record KeywordResponse(
			Integer keywordId,
			String name
	) {
		private static KeywordResponse fromEntity(KeywordEntity entity) {
			return KeywordResponse.builder()
					.keywordId(entity.getKeywordId())
					.name(entity.getName())
					.build();
		}
	}
}
