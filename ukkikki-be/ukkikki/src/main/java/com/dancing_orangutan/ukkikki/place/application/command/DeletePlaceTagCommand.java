package com.dancing_orangutan.ukkikki.place.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DeletePlaceTagCommand {

    private final Integer placeTagId;
    private final Integer placeId;
    private final Integer travelPlanId;
    private final Integer memberId;

    @Builder
    public DeletePlaceTagCommand(Integer placeTagId, Integer placeId,
                                 Integer travelPlanId, Integer memberId) {
        this.placeTagId = placeTagId;
        this.placeId = placeId;
        this.travelPlanId = travelPlanId;
        this.memberId = memberId;
    }
}
