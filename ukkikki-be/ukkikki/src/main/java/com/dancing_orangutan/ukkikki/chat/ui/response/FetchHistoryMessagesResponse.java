package com.dancing_orangutan.ukkikki.chat.ui.response;

import lombok.Builder;

import java.util.List;

public record FetchHistoryMessagesResponse(
        List<MessageResponse> messages,
        boolean hasMore
) {
    @Builder
    public FetchHistoryMessagesResponse{}
}
