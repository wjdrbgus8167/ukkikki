package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import static java.util.stream.Collectors.toList;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import org.springframework.data.domain.Page;

public record FetchAllTravelPlansResponse(
		List<TravelPlan> travelPlans,
		int totalPages,
		long totalElements,
		int pageNumber,
		int pageSize
) {

	@Builder
	public FetchAllTravelPlansResponse {

	}

	private record TravelPlan(Integer travelPlanId, String name, City arrivalCity,
							  City departureCity,int minPeople, int maxPeople,
							  LocalDate startDate, LocalDate endDate, PlanningStatus planningStatus,
							  int currentParticipants, List<Keyword> keywords) {

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

	public static FetchAllTravelPlansResponse toResponse(Page<TravelPlanEntity> page) {
		List<TravelPlan> travelPlans = page.getContent().stream()
				.map(entity -> TravelPlan.builder()
						.travelPlanId(entity.getTravelPlanId())
						.arrivalCity(City.builder()
								.cityId(entity.getArrivalCity().getCityId())
								.name(entity.getArrivalCity().getName()) // 오타 수정
								.build())
						.departureCity(City.builder()
								.cityId(entity.getDepartureCity().getCityId())
								.name(entity.getDepartureCity().getName())
								.build())
						.name(entity.getName())
						.startDate(entity.getStartDate())
						.endDate(entity.getEndDate())
						.minPeople(entity.getMinPeople())
						.maxPeople(entity.getMaxPeople())
						.planningStatus(entity.getPlanningStatus())
						.currentParticipants(entity.getMemberTravelPlans().stream().mapToInt(
								memberTravelPlanEntity -> memberTravelPlanEntity.getAdultCount()
										+ memberTravelPlanEntity.getChildCount()
										+ memberTravelPlanEntity.getInfantCount()
						).sum())
						.keywords(entity.getTravelPlanKeywords().stream()
								.map(keyword -> Keyword.builder()
										.keywordId(keyword.getKeyword().getKeywordId())
										.name(keyword.getKeyword().getName())
										.build())
								.collect(toList()))
						.build())
				.toList();

		return new FetchAllTravelPlansResponse(
				travelPlans,
				page.getTotalPages(),
				page.getTotalElements(),
				page.getNumber(),
				page.getSize()
		);
	}
}
