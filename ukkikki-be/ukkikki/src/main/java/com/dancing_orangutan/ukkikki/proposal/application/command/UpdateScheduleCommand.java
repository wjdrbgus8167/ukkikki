package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class UpdateScheduleCommand {

    Integer proposalId;
    Integer scheduleId;
    String scheduleName;
    LocalDateTime startDate;
    LocalDateTime endDate;
    String imageUrl;

    @Builder
    public UpdateScheduleCommand(Integer proposalId, Integer scheduleId, String scheduleName, LocalDateTime startDate, LocalDateTime endDate, String imageUrl) {

        this.proposalId = proposalId;
        this.scheduleId = scheduleId;
        this.scheduleName = scheduleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
    }
}
