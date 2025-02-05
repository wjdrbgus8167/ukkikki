package com.dancing_orangutan.ukkikki.travelPlan.mapper;


import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

//spring container에 Bean으로 등록
@Mapper(componentModel = "spring")
public interface TravelPlanMapper {


    //Read -> JoinTravelPlanResponse
    @Mapping(source = "users", target = "users")
    @Mapping(source = "travelPlan", target = "travelPlan")
    @Mapping(source = "messages", target = "messages")
    JoinTravelPlanResponse toJoinTravelResponse(TravelPlanRead travelPlanRead);

    List<MemberResponse> mapUsers(List<TravelPlanRead.UserInfo> users);

    List<MessageInfoResponse> mapMessages(List<TravelPlanRead.MessageInfo> messages);

    @Mapping(source = "places", target = "places")
    TravelPlanInfoResponse mapTravelPlan(TravelPlanRead.TravelPlanInfo travelPlan);

    List<PlaceInfoResponse> mapPlaces(List<TravelPlanRead.PlaceInfo> places);

    List<PlaceTagResponse> mapPlaceTags(List<TravelPlanRead.PlaceTagInfo> placeTags);
}

