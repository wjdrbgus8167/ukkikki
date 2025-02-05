package com.dancing_orangutan.ukkikki.travelPlan.mapper;


import com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.TravelPlanRead;
import com.dancing_orangutan.ukkikki.travelPlan.ui.response.MemberResponse;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberMapper
{
    List<MemberResponse> mapMembers(List<TravelPlanRead.UserInfo> users);
}

