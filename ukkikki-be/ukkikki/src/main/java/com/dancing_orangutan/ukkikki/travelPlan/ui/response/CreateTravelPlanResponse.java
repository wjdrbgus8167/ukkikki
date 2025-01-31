package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus;
import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDate;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreateTravelPlanResponse {

    private TravelPlanResponse travelPlan;

    @Getter
    public static class TravelPlanResponse {

        private Integer travelPlanId;

        private String name;

        private Integer departureCityId;

        private Integer arrivalCityId;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate startDate;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        private LocalDate endDate;

        private PlanningStatus planningStatus;

        private int minPeople;

        private int maxPeople;

        @Builder
        public TravelPlanResponse(Integer travelPlanId, String name, Integer departureCityId, Integer arrivalCityId, LocalDate startDate, LocalDate endDate, PlanningStatus planningStatus, int minPeople, int maxPeople) {
            this.travelPlanId = travelPlanId;
            this.name = name;
            this.departureCityId = departureCityId;
            this.arrivalCityId = arrivalCityId;
            this.startDate = startDate;
            this.endDate = endDate;
            this.planningStatus = planningStatus;
            this.minPeople = minPeople;
            this.maxPeople = maxPeople;
        }
    }

    @Builder
    public CreateTravelPlanResponse(TravelPlanResponse travelPlan) {
        this.travelPlan = travelPlan;
    }
}
