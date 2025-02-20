package com.dancing_orangutan.ukkikki.place.ui.reponse;

import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;
import lombok.Getter;

import java.util.List;

@Getter
public class CreatePlaceLikeResponse {

    private final List<Integer> places;

    public CreatePlaceLikeResponse() {
        this.places = null;
    }

    public CreatePlaceLikeResponse(List<Integer> places) {
        this.places = places;
    }

    static public CreatePlaceLikeResponse toResponse(List<LikeEntity> likeEntities) {
        List<Integer> places = likeEntities.stream()
                .map(likeEntity -> likeEntity.getLikeId().getPlaceId())
                .toList();
        return new CreatePlaceLikeResponse(places);
    }
}
