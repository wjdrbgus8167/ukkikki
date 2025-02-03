package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

//spring container에 Bean으로 등록
@Mapper(componentModel = "spring")
public interface TravelPlanMapper {

	@Mapping(source = "arrivalCity", target = "arrivalCityId", qualifiedByName = "cityToId")
	@Mapping(source = "departureCity", target = "departureCityId", qualifiedByName = "cityToId")
	TravelPlan entityToDomain(TravelPlanEntity entity);

	@Named("cityToId")
	static Integer cityToId(CityEntity city) {
		return city != null ? city.getCityId() : null;
	}

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

