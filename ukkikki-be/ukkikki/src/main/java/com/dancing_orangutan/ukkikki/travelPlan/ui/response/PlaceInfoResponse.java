package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;
import java.util.List;

@Getter
@Builder
public class PlaceInfoResponse {
    private Integer placeId;
    private String name;
    private String address;
    private List<PlaceTagResponse> placeTags;
    private int likesCnt;
    private boolean likeYn;
}