package com.dancing_orangutan.ukkikki.place.ui.request;

import lombok.Getter;

@Getter
public class CreatePlaceRequest {

    private String name;
    private String address;
    private double latitude;
    private double longitude;
}
