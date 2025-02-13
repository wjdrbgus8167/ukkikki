package com.dancing_orangutan.ukkikki.travelPlan.ui.facade.dto.response.common;

import java.time.LocalDateTime;

public record MessageResponse(String memberName, String content, LocalDateTime createdAt) {

}
