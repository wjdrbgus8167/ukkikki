package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;


import java.util.List;


@Getter
@Builder
public class JoinTravelPlanResponse {
    private List<MemberResponse> users;
    private TravelPlanInfoResponse travelPlan;
    private List<MessageInfoResponse> messages;
}
