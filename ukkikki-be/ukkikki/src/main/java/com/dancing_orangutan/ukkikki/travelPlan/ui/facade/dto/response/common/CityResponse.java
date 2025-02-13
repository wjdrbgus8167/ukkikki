package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;

import lombok.Builder;

public record CityResponse(Integer cityId, String name) {

    @Builder
    public CityResponse {

    }
}