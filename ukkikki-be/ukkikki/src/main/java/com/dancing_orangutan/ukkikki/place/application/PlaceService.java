package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.*;
import com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity;

import java.util.List;

public interface PlaceService {

    void createPlace(CreatePlaceCommand command);

    void creatPlaceTag(CreatePlaceTagCommand command);

    void deletePlaceTag(DeletePlaceTagCommand command);

    List<LikeEntity> createPlaceLike(CreatePlaceLikeCommand command);

    void deletePlaceLike(DeletePlaceLikeCommand command);

    void updatePlaceLike(UpdatePlaceLikeCommand command);
}
