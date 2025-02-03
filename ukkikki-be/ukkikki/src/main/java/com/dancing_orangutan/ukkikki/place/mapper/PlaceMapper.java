package com.dancing_orangutan.ukkikki.place.mapper;

import com.dancing_orangutan.ukkikki.place.domain.Place;
import com.dancing_orangutan.ukkikki.place.domain.PlaceEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;

public class PlaceMapper {
    
    // TODO: TravelPlan 객체 필요
    public static PlaceEntity mapToEntity(Place place, TravelPlanEntity travelPlan) {
        return PlaceEntity.builder()
                .name(place.getName())
                .address(place.getAddress())
                .latitude(place.getLatitude())
                .longitude(place.getLongitude())
                .travelPlan(travelPlan)
                .build();
    }
}
