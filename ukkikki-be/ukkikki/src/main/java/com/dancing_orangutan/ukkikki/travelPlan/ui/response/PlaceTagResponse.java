
package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PlaceTagResponse {
    private Integer placeTagId;
    private String placeTagName;
}