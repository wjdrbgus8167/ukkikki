package com.dancing_orangutan.ukkikki.chat.ui.request;

import lombok.Builder;

import java.time.LocalDateTime;

public record FetchHistoryMessagesRequest(Integer travelPlanId, LocalDateTime createdAtBefore) {

    @Builder
    public FetchHistoryMessagesRequest {};
}
