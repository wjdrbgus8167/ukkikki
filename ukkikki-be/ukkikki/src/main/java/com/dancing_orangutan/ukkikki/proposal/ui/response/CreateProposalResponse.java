package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class CreateProposalResponse {

    private Proposal proposal;
    private List<Schedule> schedules;

    @Builder
    public CreateProposalResponse(Proposal proposal, List<Schedule> schedules) {
        this.proposal = proposal;
        this.schedules = schedules;
    }

}
