package com.dancing_orangutan.ukkikki.place.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Like {

    private Integer creatorId;
    private Integer placeId;
    private int likeCount;

    @Builder
    public Like(Integer creatorId, Integer placeId, int likeCount) {
        this.creatorId = creatorId;
        this.placeId = placeId;
        this.likeCount = likeCount;
    }

}
