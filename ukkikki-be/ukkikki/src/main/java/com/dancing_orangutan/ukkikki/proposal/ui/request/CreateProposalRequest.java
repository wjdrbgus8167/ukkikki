package com.dancing_orangutan.ukkikki.proposal.ui.request;

import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CreateProposalRequest {

    private ProposalRequest proposalRequest;

    @Getter
    @NoArgsConstructor
    public static class ProposalRequest{
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

        @Builder
        public ProposalRequest(String name, LocalDate startDate,LocalDate endDate, String airline, String departureAirportCode
        ,String arrivalAirportCode,LocalDateTime startDateBoardingTime,LocalDateTime startDateArrivalTime,LocalDateTime endDateBoardingTime
        ,LocalDateTime endDateArrivalTime,int deposit,int minPeople,boolean guideIncluded,String productIntroduction
        ,String refundPolicy,boolean insuranceIncluded,ProposalStatus proposalStatus){
            this.name = name;
            this.startDate = startDate;
            this.endDate = endDate;
            this.airline = airline;
            this.departureAirportCode = departureAirportCode;
            this.arrivalAirportCode = arrivalAirportCode;
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
        }

    }

    @Builder
    public CreateProposalRequest(ProposalRequest proposalRequest){
        this.proposalRequest = proposalRequest;
    }
    public CreateProposalCommand toCommand(Integer travelPlanId,Integer companyId){
        return CreateProposalCommand.builder()
                .name(this.proposalRequest.getName())
                .startDate(proposalRequest.getStartDate())
                .endDate(proposalRequest.getEndDate())
                .airline(proposalRequest.getAirline())
                .departureAirportCode(proposalRequest.getDepartureAirportCode())
                .arrivalAirportCode(proposalRequest.getArrivalAirportCode())
                .startDateBoardingTime(proposalRequest.getStartDateBoardingTime())
                .startDateArrivalTime(proposalRequest.getEndDateArrivalTime())
                .endDateBoardingTime(proposalRequest.getEndDateBoardingTime())
                .endDateArrivalTime(proposalRequest.getEndDateArrivalTime())
                .deposit(proposalRequest.getDeposit())
                .minPeople(proposalRequest.getMinPeople())
                .guideIncluded(proposalRequest.isGuideIncluded())
                .productIntroduction(proposalRequest.getProductIntroduction())
                .refundPolicy(proposalRequest.getRefundPolicy())
                .insuranceIncluded(proposalRequest.isInsuranceIncluded())
                .proposalStatus(proposalRequest.getProposalStatus())
                .travelPlanId(travelPlanId)
                .companyId(companyId)
                .build();
    }


}
