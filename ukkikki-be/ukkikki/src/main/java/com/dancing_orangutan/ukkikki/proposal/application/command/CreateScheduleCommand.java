package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class CreateScheduleCommand {

    String scheduleName;
    LocalDateTime startDate;
    LocalDateTime endDate;
    String imageUrl;
    double latitude;
    double longitude;
    String dayNumber;

    @Builder
    public CreateScheduleCommand(String scheduleName, LocalDateTime startDate, LocalDateTime endDate, String imageUrl
    , double latitude, double longitude, String dayNumber) {

        this.scheduleName = scheduleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dayNumber = dayNumber;
    }

}
