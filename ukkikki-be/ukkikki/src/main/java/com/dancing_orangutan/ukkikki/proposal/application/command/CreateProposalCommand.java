package com.dancing_orangutan.ukkikki.proposal.application.command;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateScheduleRequest;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class CreateProposalCommand {
    private Integer travelPlanId;
    private Integer companyId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String airline;
    private String departureAirportCode;
    private String arrivalAirportCode;
    private LocalDateTime startDateBoardingTime;
    private LocalDateTime startDateArrivalTime;
    private LocalDateTime endDateBoardingTime;
    private LocalDateTime endDateArrivalTime;
    private int deposit;
    private int minPeople;
    private boolean guideIncluded;
    private String productIntroduction;
    private String refundPolicy;
    private boolean insuranceIncluded;
    private ProposalStatus proposalStatus;
    private List<CreateScheduleCommand> scheduleItems;
}
