package com.dancing_orangutan.ukkikki.place.ui.request;

import com.dancing_orangutan.ukkikki.place.validator.ValidPlaceTagName;
import lombok.Getter;

@Getter
public class CreatePlaceTagRequest {
    @ValidPlaceTagName
    private String placeTagName;
}
