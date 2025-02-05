package com.dancing_orangutan.ukkikki.proposal.application;


import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule.ScheduleFinder;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ProposalDetailResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ScheduleResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor

public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final ScheduleFinder scheduleFinder;
    // 제안서 작성
   public Proposal createProposal(CreateProposalCommand command){

       Proposal domain= Proposal.builder()
               .startDate(command.getStartDate())
               .endDate(command.getEndDate())
               .airline(command.getAirline())
               .departureAirportCode(command.getDepartureAirportCode())
               .arrivalAirportCode(command.getArrivalAirportCode())
               .startDateBoardingTime(command.getStartDateBoardingTime())
               .endDateBoardingTime(command.getEndDateBoardingTime())
               .startDateArrivalTime(command.getStartDateArrivalTime())
               .endDateArrivalTime(command.getEndDateArrivalTime())
               .deposit(command.getDeposit())
               .minPeople(command.getMinPeople())
               .guideIncluded(command.isGuideIncluded())
               .productIntroduction(command.getProductIntroduction())
               .refundPolicy(command.getRefundPolicy())
               .insuranceIncluded(command.isInsuranceIncluded())
               .proposalStatus(command.getProposalStatus())
               .createTime(LocalDateTime.now())
               .updateTime(LocalDateTime.now())
               .companyId(command.getCompanyId())
               .travelPlanId(command.getTravelPlanId())
               .build();


       return proposalRepository.save(domain);
   }

   // 제안서 상세 조회
    public ProposalDetailResponse getProposalDetail(Integer proposalId) {

        Proposal proposal = proposalRepository.findById(proposalId);

        List<ScheduleResponse> schedules = scheduleFinder.findSchedulesByProposalId(proposalId).stream()
                .map(schedule -> new ScheduleResponse(
                        schedule.getScheduleName(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getImageUrl()))
                .collect(Collectors.toList());

        return new ProposalDetailResponse(proposal,schedules);
    }

}
