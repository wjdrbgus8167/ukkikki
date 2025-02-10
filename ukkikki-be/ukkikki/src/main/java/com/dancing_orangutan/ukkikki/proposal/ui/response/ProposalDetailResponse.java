package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Getter
public class ProposalDetailResponse {

    private Integer proposalId;
    private Integer companyId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String airLine;
    private String departureAirportCode;
    private String arrivalAirportCode;
    private LocalDateTime startDateBoardingTime;
    private LocalDateTime endDateBoardingTime;
    private LocalDateTime endDateArrivalTime;
    private int deposit;
    private int minPeople;
    private boolean guideIncluded;
    private String productInformation;
    private String refundPolicy;
    private boolean insuranceIncluded;
    private String confirmStatus;
    private List<ScheduleResponse> schedules;

    @Builder
    public ProposalDetailResponse(Proposal proposal,List<ScheduleResponse> schedules) {
        this.proposalId = proposal.getProposalId();
        this.companyId = proposal.getCompanyId();
        this.name = proposal.getName();
        this.startDate = proposal.getStartDate();
        this.endDate = proposal.getEndDate();
        this.airLine = proposal.getAirline();
        this.departureAirportCode = proposal.getDepartureAirportCode();
        this.arrivalAirportCode = proposal.getArrivalAirportCode();
        this.startDateBoardingTime = proposal.getStartDateBoardingTime();
        this.endDateBoardingTime = proposal.getEndDateBoardingTime();
        this.endDateArrivalTime = proposal.getEndDateArrivalTime();
        this.deposit = proposal.getDeposit();
        this.minPeople = proposal.getMinPeople();
        this.guideIncluded = proposal.isGuideIncluded();
        this.productInformation = proposal.getProductIntroduction();
        this.refundPolicy = proposal.getRefundPolicy();
        this.insuranceIncluded = proposal.isInsuranceIncluded();
        this.confirmStatus = proposal.getProposalStatus().name();
        this.schedules = schedules;
    }
}
