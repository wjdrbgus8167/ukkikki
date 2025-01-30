package com.dancing_orangutan.ukkikki.mapper;

import com.dancing_orangutan.ukkikki.domain.TravelPlanDomain;
import com.dancing_orangutan.ukkikki.entity.travelPlan.TravelPlan;
import org.mapstruct.Mapper;

//spring container에 Bean으로 등록
@Mapper(componentModel = "spring")
public interface TravelPlanMapper {

	TravelPlan domainToEntity(TravelPlanDomain domain);

	TravelPlanDomain entityToDomain(TravelPlan entity);

}
