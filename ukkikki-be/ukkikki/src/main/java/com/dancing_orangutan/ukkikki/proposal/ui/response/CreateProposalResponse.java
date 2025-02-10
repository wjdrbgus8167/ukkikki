package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class CreateProposalResponse {

    private Integer proposalId;
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
}
