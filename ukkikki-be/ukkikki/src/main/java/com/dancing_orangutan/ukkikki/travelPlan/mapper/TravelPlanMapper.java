package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.entity.info.CityEntity;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

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
}

