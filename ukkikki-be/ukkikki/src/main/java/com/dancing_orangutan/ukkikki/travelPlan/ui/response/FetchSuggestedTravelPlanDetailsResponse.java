package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

public record FetchSuggestedTravelPlanDetailsResponse(TravelPlan travelPlan) {

    @Builder
    public FetchSuggestedTravelPlanDetailsResponse {}

    public record TravelPlan(String name, City arrivalCity, City departureCity,
                             LocalDate startDate, LocalDate endDate,
                             int currentParticipants, List<Keyword> keywords, List<Place> places) {
        @Builder
        public TravelPlan {}
    }

    public record City(Integer cityId, String name) {
        @Builder
        public City {}
    }

    public record Keyword(Integer keywordId, String name) {
        @Builder
        public Keyword {}
    }

    public record Place(Integer placeId, String name) {
        @Builder
        public Place {}
    }

    public static FetchSuggestedTravelPlanDetailsResponse toResponse(final TravelPlanEntity entity) {
        return FetchSuggestedTravelPlanDetailsResponse.builder()
                .travelPlan(
                        TravelPlan.builder()
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
                                        memberTravelPlanEntity-> memberTravelPlanEntity.getAdultCount() + memberTravelPlanEntity.getChildCount() + memberTravelPlanEntity.getInfantCount()
                                ).sum())
                                .keywords(
                                        entity.getTravelPlanKeywords().stream()
                                                .map(k -> Keyword.builder()
                                                        .keywordId(k.getKeyword().getKeywordId())
                                                        .name(k.getTravelPlan().getName())
                                                        .build())
                                                .toList()
                                )
                                .places(
                                        entity.getPlaces().stream()
                                                .map(p -> Place.builder()
                                                        .placeId(p.getPlaceId())
                                                        .name(p.getName())
                                                        .build())
                                                .toList()
                                )
                                .build()
                )
                .build();
    }
}
