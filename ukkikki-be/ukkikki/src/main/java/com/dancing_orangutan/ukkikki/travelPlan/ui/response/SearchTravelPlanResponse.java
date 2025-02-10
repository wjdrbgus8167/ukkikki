package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Builder;

public record SearchTravelPlanResponse(@JsonProperty("travelPlans") List<TravelPlan> travelPlans) {

	private record TravelPlan(
			Integer travelPlanId,
			String name,
			City departureCity,
			City arrivalCity,
			LocalDate startDate,
			LocalDate endDate,
			int currentParticipants,
			int minPeople,
			int maxPeople,
			PlanningStatus planningStatus,
			List<Keyword> keywords
	) {
		@Builder
		private TravelPlan {
		}
	}

	private record City(Integer cityId, String name) {
		@Builder
		private City {
		}
	}

	private record Keyword(Integer keywordId, String name) {
		@Builder
		private Keyword {
		}
	}

	@Builder
	public SearchTravelPlanResponse {
	}

	public static SearchTravelPlanResponse toResponse(final List<TravelPlanEntity> entities) {
		return SearchTravelPlanResponse.builder().travelPlans(
				entities.stream().map(entity -> TravelPlan.builder()
						.travelPlanId(entity.getTravelPlanId())
						.name(entity.getName())
						.arrivalCity(
								City.builder()
										.cityId(entity.getArrivalCity().getCityId())
										.name(entity.getArrivalCity().getName())
										.build()
						)
						.departureCity(
								City.builder()
										.cityId(entity.getDepartureCity().getCityId())
										.name(entity.getDepartureCity().getName())
										.build()
						)
						.startDate(entity.getStartDate())
						.endDate(entity.getEndDate())
						.currentParticipants(entity.getMemberTravelPlans().stream().mapToInt(
								memberTravelPlanEntity -> memberTravelPlanEntity.getAdultCount()
										+ memberTravelPlanEntity.getChildCount()
										+ memberTravelPlanEntity.getInfantCount()
						).sum())
						.minPeople(entity.getMinPeople())
						.maxPeople(entity.getMaxPeople())
						.planningStatus(entity.getPlanningStatus())
						.keywords(
								entity.getTravelPlanKeywords().stream()
										.map(k -> Keyword.builder()
												.keywordId(k.getKeyword().getKeywordId())
												.name(k.getKeyword().getName())
												.build())
										.collect(Collectors.toList())
						)
						.build()
				).collect(Collectors.toList())
		).build();
	}
}
