package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceCommand;
import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceTagCommand;

public interface PlaceService {

    void createPlace(CreatePlaceCommand command);

    void creatPlaceTag(CreatePlaceTagCommand command);
}
