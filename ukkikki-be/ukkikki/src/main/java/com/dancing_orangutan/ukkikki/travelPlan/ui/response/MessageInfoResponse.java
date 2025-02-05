package com.dancing_orangutan.ukkikki.travelPlan.ui.response;

import lombok.Builder;
import lombok.Getter;
import java.time.LocalDate;

@Getter
@Builder
public class MessageInfoResponse {
    private String name;
    private String content;
    private String profileImageUrl;
    private LocalDate createdAt;
}