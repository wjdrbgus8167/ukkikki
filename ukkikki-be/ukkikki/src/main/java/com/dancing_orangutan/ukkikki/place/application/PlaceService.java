package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceCommand;
import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceLikeCommand;
import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceTagCommand;
import com.dancing_orangutan.ukkikki.place.application.command.DeletePlaceTagCommand;

public interface PlaceService {

    void createPlace(CreatePlaceCommand command);

    void creatPlaceTag(CreatePlaceTagCommand command);

    void deletePlaceTag(DeletePlaceTagCommand command);

    void createPlaceLike(CreatePlaceLikeCommand command);
}
