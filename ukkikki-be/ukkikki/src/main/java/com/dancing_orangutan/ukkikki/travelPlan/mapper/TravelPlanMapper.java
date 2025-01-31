package com.dancing_orangutan.ukkikki.travelPlan.mapper;

import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlan;
import com.dancing_orangutan.ukkikki.travelPlan.domain.TravelPlanEntity;
import org.mapstruct.Mapper;

//spring container에 Bean으로 등록
@Mapper(componentModel = "spring")
public interface TravelPlanMapper {

	TravelPlanEntity domainToEntity(TravelPlan domain);

	TravelPlan entityToDomain(TravelPlanEntity entity);

}
