package com.dancing_orangutan.ukkikki.place.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreatePlaceTagCommand {

    private final Integer placeTagName;
    private final Integer placeId;
    private final Integer travelPlanId;
    private final Integer memberId;

    @Builder
    public CreatePlaceTagCommand(Integer placeTagName, Integer placeId,
                                 Integer travelPlanId, Integer memberId) {
        this.placeTagName = placeTagName;
        this.placeId = placeId;
        this.travelPlanId = travelPlanId;
        this.memberId = memberId;
    }
}
