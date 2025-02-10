package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import lombok.Builder;

import java.time.LocalDate;
import java.util.List;

public record FetchSuggestedTravelPlanDetailsResponse(TravelPlan travelPlan) {

    @Builder
    public FetchSuggestedTravelPlanDetailsResponse {
    }

    private record TravelPlan(Integer travelPlanId,String name, City arrivalCity, City departureCity,
                              LocalDate startDate, LocalDate endDate,
                              int currentParticipants, List<Keyword> keywords, List<Place> places) {
        @Builder
        public TravelPlan {
        }
    }

    private record City(Integer cityId, String name) {
        @Builder
        public City {
        }
    }

    private record Keyword(Integer keywordId, String name) {
        @Builder
        public Keyword {
        }
    }

    private record Place(Integer placeId, String name, List<PlaceTag> tags, Integer likeCount, double latitude, double longitude) {
        @Builder
        public Place {
        }
    }

    private record PlaceTag(Integer placeTagId, String name) {

        @Builder
        public PlaceTag {
        }
    }


    public static FetchSuggestedTravelPlanDetailsResponse toResponse(final TravelPlanEntity entity) {
        return FetchSuggestedTravelPlanDetailsResponse.builder()
                .travelPlan(
                        TravelPlan.builder()
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
                                        memberTravelPlanEntity -> memberTravelPlanEntity.getAdultCount() + memberTravelPlanEntity.getChildCount() + memberTravelPlanEntity.getInfantCount()
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
                                                        .tags(p.getPlaceTags().stream()
                                                                .map(tag -> PlaceTag.builder()
                                                                        .placeTagId(tag.getPlaceTagId())
                                                                        .name(tag.getPlaceTagName())
                                                                        .build())
                                                                .toList())
                                                        .likeCount(p.getLikes().stream()
                                                                .mapToInt(LikeEntity::getLikesCnt)
                                                                .sum())
                                                        .latitude(p.getLatitude())
                                                        .longitude(p.getLongitude())
                                                        .build())
                                                .toList()
                                )
                                .build()
                )
                .build();
    }

}
