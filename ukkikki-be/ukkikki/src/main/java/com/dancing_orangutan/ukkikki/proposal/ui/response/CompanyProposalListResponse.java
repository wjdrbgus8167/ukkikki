package com.dancing_orangutan.ukkikki.proposal.ui.response;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class CompanyProposalListResponse {

    private final Integer proposalId;
    private final Integer travelPlanId;
    private final String name;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String airline;
    private final String departureAirportName;
    private final String arrivalAirportName;
    private final int deposit;
    private final int minPeople;
    private final String proposalStatus;
    private final LocalDateTime createTime;

    @Builder
    public CompanyProposalListResponse(Integer proposalId, Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate,
                                       String airline, String departureAirportName, String arrivalAirportName,
                                       int deposit, int minPeople, String proposalStatus, LocalDateTime createTime) {
        this.proposalId = proposalId;
        this.travelPlanId = travelPlanId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.airline = airline;
        this.departureAirportName = departureAirportName;
        this.arrivalAirportName = arrivalAirportName;
        this.deposit = deposit;
        this.minPeople = minPeople;
        this.proposalStatus = proposalStatus;
        this.createTime = createTime;
    }
}
