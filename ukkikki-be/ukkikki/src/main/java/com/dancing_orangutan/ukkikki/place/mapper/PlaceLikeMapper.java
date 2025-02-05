package com.dancing_orangutan.ukkikki.place.mapper;

import com.dancing_orangutan.ukkikki.place.domain.Like;
import com.dancing_orangutan.ukkikki.place.domain.LikeEntity;
import com.dancing_orangutan.ukkikki.place.domain.LikeId;

public class PlaceLikeMapper {

    public static LikeEntity mapToEntity(Like like) {

        LikeId likeId = new LikeId(like.getPlaceId(), like.getCreatorId());

        return LikeEntity.builder()
                .likesCnt(like.getLikeCount())
                .likeId(likeId)
                .build();
    }
}
