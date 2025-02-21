package com.dancing_orangutan.ukkikki.proposal.domain.proposal;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
public class Proposal {

    private final Integer proposalId;
    private final String name;
    private final LocalDate startDate;
    private final LocalDate endDate;
    private final String airline;
    private final LocalDateTime startDateBoardingTime;
    private final LocalDateTime startDateArrivalTime;
    private final LocalDateTime endDateBoardingTime;
    private final LocalDateTime endDateArrivalTime;
    private final int deposit;
    private final int minPeople;
    private final boolean guideIncluded;
    private final String productIntroduction;
    private final String refundPolicy;
    private final boolean insuranceIncluded;
    private final ProposalStatus proposalStatus;
    private final LocalDateTime createTime;
    private final LocalDateTime updateTime;
    private final Integer companyId;
    private final Integer travelPlanId;
    private final String departureAirportCode;
    private final String arrivalAirportCode;

    @Builder
    public Proposal(Integer proposalId,String name,LocalDate startDate,LocalDate endDate,String airline
            ,LocalDateTime startDateBoardingTime,LocalDateTime startDateArrivalTime,LocalDateTime endDateBoardingTime
            ,LocalDateTime endDateArrivalTime,int deposit,int minPeople,boolean guideIncluded,String productIntroduction
            ,String refundPolicy,boolean insuranceIncluded,ProposalStatus proposalStatus,LocalDateTime createTime
            ,LocalDateTime updateTime,Integer companyId, Integer travelPlanId, String departureAirportCode, String arrivalAirportCode) {

        this.proposalId = proposalId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.airline = airline;
        this.startDateBoardingTime = startDateBoardingTime;
        this.startDateArrivalTime = startDateArrivalTime;
        this.endDateBoardingTime = endDateBoardingTime;
        this.endDateArrivalTime = endDateArrivalTime;
        this.deposit = deposit;
        this.minPeople = minPeople;
        this.guideIncluded = guideIncluded;
        this.productIntroduction = productIntroduction;
        this.refundPolicy = refundPolicy;
        this.insuranceIncluded = insuranceIncluded;
        this.proposalStatus = proposalStatus;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.companyId = companyId;
        this.travelPlanId = travelPlanId;
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
    }
}
