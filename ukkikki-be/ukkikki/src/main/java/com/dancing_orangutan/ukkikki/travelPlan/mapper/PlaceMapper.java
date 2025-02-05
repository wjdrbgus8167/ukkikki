package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceInfoResponse;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.PlaceTagResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlaceMapper {

    List<PlaceInfoResponse> mapPlaces(List<TravelPlanRead.PlaceInfo> places);

    List<PlaceTagResponse> mapPlaceTags(List<TravelPlanRead.PlaceTagInfo> placeTags);
}

