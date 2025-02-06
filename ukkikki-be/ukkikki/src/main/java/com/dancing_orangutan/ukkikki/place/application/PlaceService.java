package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.*;

public interface PlaceService {

    void createPlace(CreatePlaceCommand command);

    void creatPlaceTag(CreatePlaceTagCommand command);

    void deletePlaceTag(DeletePlaceTagCommand command);

    void createPlaceLike(CreatePlaceLikeCommand command);

    void deletePlaceLike(DeletePlaceLikeCommand command);
}
