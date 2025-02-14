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
    private String dayNumber;
    private double latitude;
    private double longitude;

    @Builder
    public ScheduleResponse(String scheduleName, LocalDateTime startTime, LocalDateTime endTime, String imageUrl
    ,String dayNumber, double latitude, double longitude) {
        this.scheduleName = scheduleName;
        this.startTime = startTime;
        this.endTime = endTime;
        this.imageUrl = imageUrl;
        this.dayNumber = dayNumber;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}
