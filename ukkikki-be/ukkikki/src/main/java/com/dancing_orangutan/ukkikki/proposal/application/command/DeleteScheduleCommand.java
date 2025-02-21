package com.dancing_orangutan.ukkikki.proposal.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
public class DeleteScheduleCommand {

    private final Integer proposalId;
    private final Integer scheduleId;

    @Builder public DeleteScheduleCommand(Integer proposalId, Integer scheduleId){
        this.proposalId = proposalId;
        this.scheduleId = scheduleId;
    }
}
