package com.dancing_orangutan.ukkikki.place.application.command;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class CreatePlaceCommand {

    private Integer travelPlanId;
    private String name;
    private String address;
    private double latitude;
    private double longitude;
}
