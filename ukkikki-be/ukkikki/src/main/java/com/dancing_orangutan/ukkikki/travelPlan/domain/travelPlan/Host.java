package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import lombok.Builder;

public record Host(Integer memberId, int adultCount, int childCount, int infantCount) {

    @Builder
    public Host {
    }
}
