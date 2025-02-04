package com.dancing_orangutan.ukkikki.place.mapper;

import com.dancing_orangutan.ukkikki.place.domain.PlaceEntity;
import com.dancing_orangutan.ukkikki.place.domain.PlaceTag;
import com.dancing_orangutan.ukkikki.place.domain.PlaceTagEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;

public class PlaceTagMapper {

    public static PlaceTagEntity mapToEntity(PlaceTag placeTag,
                                             PlaceEntity placeEntity,
                                             MemberTravelPlanEntity memberTravelPlanEntity) {
        return PlaceTagEntity.builder()
                .placeTagName(placeTag.getPlaceTagName())
                .placeEntity(placeEntity)
                .memberTravelPlan(memberTravelPlanEntity)
                .build();
    }
}
