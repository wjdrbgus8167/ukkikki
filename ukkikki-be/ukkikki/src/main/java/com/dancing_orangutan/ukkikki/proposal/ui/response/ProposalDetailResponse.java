package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
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
    private Integer travelPlanId;
    private String name;
    private LocalDate startDate;
    private LocalDate endDate;
    private String airLine;
    private String departureAirport;
    private String arrivalAirport;
    private LocalDateTime startDateBoardingTime;
    private LocalDateTime startDateArrivalTime;
    private LocalDateTime endDateBoardingTime;
    private LocalDateTime endDateArrivalTime;
    private int deposit;
    private int minPeople;
    private boolean guideIncluded;
    private String productInformation;
    private String refundPolicy;
    private boolean insuranceIncluded;
    private ProposalStatus confirmStatus;
    private String companyName;
    private String departureAirportCode;
    private String arrivalAirportCode;
    private List<DayResponse> daySchedules;


    @Builder
    public ProposalDetailResponse(Integer proposalId,Integer companyId,Integer travelPlanId, String name, LocalDate startDate, LocalDate endDate
            ,String airLine,String departureAirport,String arrivalAirport,LocalDateTime startDateBoardingTime
            ,LocalDateTime startDateArrivalTime, LocalDateTime endDateBoardingTime, LocalDateTime endDateArrivalTime
            , int deposit, int minPeople, boolean guideIncluded, String productInformation, String refundPolicy
            , boolean insuranceIncluded, ProposalStatus confirmStatus, String companyName
            ,String departureAirportCode,String arrivalAirportCode,List<DayResponse> daySchedules) {

        this.proposalId = proposalId;
        this.companyId = companyId;
        this.travelPlanId = travelPlanId;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
        this.airLine = airLine;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
        this.startDateBoardingTime = startDateBoardingTime;
        this.startDateArrivalTime = startDateArrivalTime;
        this.endDateBoardingTime = endDateBoardingTime;
        this.endDateArrivalTime = endDateArrivalTime;
        this.deposit = deposit;
        this.minPeople = minPeople;
        this.guideIncluded = guideIncluded;
        this.productInformation = productInformation;
        this.refundPolicy = refundPolicy;
        this.insuranceIncluded = insuranceIncluded;
        this.confirmStatus = confirmStatus;
        this.companyName = companyName;
        this.departureAirportCode = departureAirportCode;
        this.arrivalAirportCode = arrivalAirportCode;
        this.daySchedules = daySchedules;

    }

    @Getter
    public static class DayResponse {
        private Integer dayNumber;
        private List<ScheduleResponse> schedules;

        @Builder
        public DayResponse(Integer dayNumber, List<ScheduleResponse> schedules) {
            this.dayNumber = dayNumber;
            this.schedules = schedules;
        }
    }
}
