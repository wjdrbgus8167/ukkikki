package com.dancing_orangutan.ukkikki.travelPlan.ui.response;


import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import lombok.Builder;


import java.time.LocalDate;
import java.util.List;

public record CreateTravelPlanResponse(TravelPlan travelPlan) {

    
    @Builder 
    public CreateTravelPlanResponse{
        
    }

    private record TravelPlan(Integer travelPlanId, String name, City arrivalCity, City departureCity,
                              LocalDate startDate, LocalDate endDate, PlanningStatus planningStatus,int minPeople,int maxPeople,
                              int currentParticipants, List<Keyword> keywords) {
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

    public static CreateTravelPlanResponse toResponse(final TravelPlanEntity entity) {
        return CreateTravelPlanResponse.builder()
                .travelPlan(
                         TravelPlan.builder()
                                .travelPlanId(entity.getTravelPlanId())
                                .name(entity.getName())
                                 .maxPeople(entity.getMaxPeople())
                                 .maxPeople(entity.getMaxPeople())
                                 .planningStatus(entity.getPlanningStatus())
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
                                                .map(k ->  Keyword.builder()
                                                        .keywordId(k.getKeyword().getKeywordId())
                                                        .name(k.getKeyword().getName())
                                                        .build())
                                                .toList()
                                )
                                .build()
                )
                .build();
    }


}
