package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response;

import com.dancing_orangutan.ukkikki.geography.domain.city.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.KeywordEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import org.springframework.data.domain.Page;

public record FetchAvailableTravelPlansResponse(
		List<TravelPlanResponse> travelPlans,
		int totalPages,
		long totalElements,
		int pageNumber,
		int pageSize
) {

	@Builder
	public FetchAvailableTravelPlansResponse {

	}

	public static FetchAvailableTravelPlansResponse fromEntities(Page<TravelPlanEntity> pages, Integer memberId) {

		List<TravelPlanResponse> travelPlans = pages.getContent().stream()
				.map(entity -> TravelPlanResponse.fromEntity(entity, memberId))
				.toList();

		return FetchAvailableTravelPlansResponse.
				builder()
				.travelPlans(travelPlans)
				.pageNumber(pages.getNumber())
				.pageSize(pages.getSize())
				.totalPages(pages.getTotalPages())
				.totalElements(pages.getTotalElements())
				.build();
	}

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
			List<KeywordResponse> keywords,
			boolean hasJoined
	) {
		@Builder
		private TravelPlanResponse {}

		private static TravelPlanResponse fromEntity(
				TravelPlanEntity entity, Integer memberId) {
			return TravelPlanResponse.builder()
					.travelPlanId(entity.getTravelPlanId())
					.name(entity.getName())
					.arrivalCity(
							CityResponse.fromEntity(entity.getArrivalCity())
					)
					.departureCity(
							CityResponse.fromEntity(entity.getDepartureCity())
					)
					.startDate(entity.getStartDate())
					.endDate(entity.getEndDate())
					.minPeople(entity.getMinPeople())
					.maxPeople(entity.getMaxPeople())
					.planningStatus(entity.getPlanningStatus())
					.currentParticipants(entity.calCurrentParticipants())
					.keywords(
							entity.getTravelPlanKeywords().stream()
									.map(travelPlanKeywordEntity ->
											KeywordResponse.fromEntity(travelPlanKeywordEntity.getKeyword()))
									.toList()
					)
					.hasJoined(entity.getMemberTravelPlans().stream()
							.anyMatch(memberTravelEntity -> memberTravelEntity.hasJoined(memberId)))
					.build();
		}
	}

	private record KeywordResponse(
			Integer keywordId,
			String name
	) {
		@Builder
		private KeywordResponse {}

		private static KeywordResponse fromEntity(KeywordEntity entity) {
			return KeywordResponse.builder()
					.keywordId(entity.getKeywordId())
					.name(entity.getName())
					.build();
		}
	}

	private record CityResponse(
			Integer cityId,
			String name
	) {
		@Builder
		private CityResponse {}

		private static CityResponse fromEntity(CityEntity entity) {
			return CityResponse.builder()
					.cityId(entity.getCityId())
					.name(entity.getName())
					.build();
		}
	}
}
