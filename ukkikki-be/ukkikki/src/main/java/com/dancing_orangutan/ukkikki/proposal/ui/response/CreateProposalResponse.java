package com.dancing_orangutan.ukkikki.proposal.ui.response;

import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@JsonPropertyOrder({
        "proposalId", "name", "startDate", "endDate", "airline",
        "startDateBoardingTime", "startDateArrivalTime", "endDateBoardingTime", "endDateArrivalTime",
        "deposit", "minPeople", "guideIncluded", "productIntroduction", "refundPolicy",
        "insuranceIncluded", "proposalStatus", "createTime", "updateTime", "companyId",
        "travelPlanId", "departureAirportCode", "arrivalAirportCode", "schedules"
})
@Getter
public class CreateProposalResponse {

    private ProposalWithSchedules proposal;

    @Builder
    public CreateProposalResponse(Proposal proposal, List<Schedule> schedules) {
        this.proposal = new ProposalWithSchedules(proposal, schedules);
    }

    @Getter
    public static class ProposalWithSchedules {
        private Integer proposalId;
        private String name;
        private LocalDate startDate;
        private LocalDate endDate;
        private String airline;
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
        private LocalDateTime createTime;
        private LocalDateTime updateTime;
        private Integer companyId;
        private Integer travelPlanId;
        private String departureAirportCode;
        private String arrivalAirportCode;

        private List<Schedule> schedules;

        public ProposalWithSchedules(Proposal proposal, List<Schedule> schedules) {
            this.proposalId = proposal.getProposalId();
            this.name = proposal.getName();
            this.startDate = proposal.getStartDate();
            this.endDate = proposal.getEndDate();
            this.airline = proposal.getAirline();
            this.startDateBoardingTime = proposal.getStartDateBoardingTime();
            this.startDateArrivalTime = proposal.getStartDateArrivalTime();
            this.endDateBoardingTime = proposal.getEndDateBoardingTime();
            this.endDateArrivalTime = proposal.getEndDateArrivalTime();
            this.deposit = proposal.getDeposit();
            this.minPeople = proposal.getMinPeople();
            this.guideIncluded = proposal.isGuideIncluded();
            this.productIntroduction = proposal.getProductIntroduction();
            this.refundPolicy = proposal.getRefundPolicy();
            this.insuranceIncluded = proposal.isInsuranceIncluded();
            this.proposalStatus = proposal.getProposalStatus();
            this.createTime = proposal.getCreateTime();
            this.updateTime = proposal.getUpdateTime();
            this.companyId = proposal.getCompanyId();
            this.travelPlanId = proposal.getTravelPlanId();
            this.departureAirportCode = proposal.getDepartureAirportCode();
            this.arrivalAirportCode = proposal.getArrivalAirportCode();
            this.schedules = schedules;
        }
    }
}
