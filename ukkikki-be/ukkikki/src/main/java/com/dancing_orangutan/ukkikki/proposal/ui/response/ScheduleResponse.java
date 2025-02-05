package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class ScheduleResponse {

    private String scheduleName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String imageUrl;

    @Builder
    public ScheduleResponse(String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl) {
        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
    }
}
