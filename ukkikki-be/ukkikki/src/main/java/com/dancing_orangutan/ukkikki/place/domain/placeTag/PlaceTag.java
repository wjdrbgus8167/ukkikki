package com.dancing_orangutan.ukkikki.place.domain.placeTag;

import lombok.Builder;
import lombok.Getter;

@Getter
public class PlaceTag {

    Integer placeTagId;
    String placeTagName;
    Integer placeId;
    Integer creatorId; // 태그 작성자의 Id

    @Builder
    public PlaceTag(Integer placeTagId, String placeTagName,
                    Integer placeId, Integer creatorId) {
        this.placeTagId = placeTagId;
        this.placeTagName = placeTagName;
        this.placeId = placeId;
        this.creatorId = creatorId;
    }
}
