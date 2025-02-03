
package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class TravelPlanInfoResponse {
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String departureCityName;
    private String arrivalCityName;
    private String hostComment;
    private String planningStatus;
    private LocalDateTime createTime;
    private LocalDateTime closeTime;
    private int minPeople;
    private int maxPeople;
    private List<String> keywords;
    private List<PlaceInfoResponse> places;
}