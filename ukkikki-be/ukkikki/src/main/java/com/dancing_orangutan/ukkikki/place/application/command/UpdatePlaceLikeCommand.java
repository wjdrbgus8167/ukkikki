package com.dancing_orangutan.ukkikki.place.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class UpdatePlaceLikeCommand {

    private final Integer travelPlanId;
    private final Integer memberId;
    private final int adultCount;
    private final int childCount;
    private final int infantCount;

    @Builder
    public UpdatePlaceLikeCommand(Integer travelPlanId, Integer memberId,
                                  int adultCount, int childCount, int infantCount) {

        this.travelPlanId = travelPlanId;
        this.memberId = memberId;
        this.adultCount = adultCount;
        this.childCount = childCount;
        this.infantCount = infantCount;
    }
}
