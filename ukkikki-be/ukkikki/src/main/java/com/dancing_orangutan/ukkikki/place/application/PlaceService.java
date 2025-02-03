package com.dancing_orangutan.ukkikki.place.application;

import com.dancing_orangutan.ukkikki.place.application.command.CreatePlaceCommand;

public interface PlaceService {

    void createPlace(CreatePlaceCommand command);
}
