package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class CreateScheduleCommand {

    Integer proposalId;
    String scheduleName;
    LocalDateTime startDate;
    LocalDateTime endDate;
    String imageUrl;
    @Builder
    public CreateScheduleCommand(Integer proposalId, String scheduleName, LocalDateTime startDate, LocalDateTime endDate, String imageUrl) {

        this.proposalId = proposalId;
        this.scheduleName = scheduleName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.imageUrl = imageUrl;
    }

}
