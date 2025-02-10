package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import static java.util.stream.Collectors.toList;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.KeywordUi;
import com.dancing_orangutan.ukkikki.travelPlan.ui.request.TravelPlanInfoUi;
import java.util.List;
import lombok.Builder;
import org.springframework.data.domain.Page;

public record FetchAllTravelPlansResponse(
        List<TravelPlanInfoUi> travelPlans,
        int totalPages,
        long totalElements,
        int pageNumber,
        int pageSize
) {

    @Builder
    public FetchAllTravelPlansResponse {

    }
    public static FetchAllTravelPlansResponse toResponse(Page<TravelPlanEntity> page) {
        List<TravelPlanInfoUi> uiList = page.getContent().stream()
                .map(entity -> TravelPlanInfoUi.builder()
                        .travelPlanId(entity.getTravelPlanId())
                        .arrivalCityId(entity.getArrivalCity().getCityId())
                        .departureCityId(entity.getDepartureCity().getCityId())
                        .name(entity.getName())
                        .startDate(entity.getStartDate())
                        .endDate(entity.getEndDate())
                        .planningStatus(entity.getPlanningStatus())
                        .keywords(entity.getTravelPlanKeywords().stream()
                                .map(keyword -> KeywordUi.builder()
                                        .keywordId(keyword.getTravelPlanKeywordId().getKeywordId())
                                        .build())
                                .collect(toList()))
                        .build())
                .collect(toList());

        return new FetchAllTravelPlansResponse(
                uiList,
                page.getTotalPages(),
                page.getTotalElements(),
                page.getNumber(),
                page.getSize()
        );
    }
}
