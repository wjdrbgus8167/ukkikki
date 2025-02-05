package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberResponse {
    private Integer userId;
    private String name;
    private boolean hostYn;
    private int totalCount;
    private String profileImageUrl;
}