package com.dancing_orangutan.ukkikki.place.ui.request;

import com.dancing_orangutan.ukkikki.member.validator.ValidPassword;
import com.dancing_orangutan.ukkikki.place.validator.ValidLatitude;
import com.dancing_orangutan.ukkikki.place.validator.ValidLongitude;
import com.dancing_orangutan.ukkikki.place.validator.ValidPlaceAddress;
import lombok.Getter;

@Getter
public class CreatePlaceRequest {
    @ValidPassword
    private String name;
    @ValidPlaceAddress
    private String address;
    @ValidLatitude
    private double latitude;
    @ValidLongitude
    private double longitude;
}
