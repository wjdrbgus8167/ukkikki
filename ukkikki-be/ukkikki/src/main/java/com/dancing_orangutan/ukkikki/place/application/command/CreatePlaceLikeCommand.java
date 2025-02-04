package com.dancing_orangutan.ukkikki.place.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class CreatePlaceLikeCommand {

    private final Integer placeId;
    private final Integer memberId;

    @Builder
    public CreatePlaceLikeCommand(Integer placeId, Integer memberId, int likeCount) {
        this.placeId = placeId;
        this.memberId = memberId;
    }
}
