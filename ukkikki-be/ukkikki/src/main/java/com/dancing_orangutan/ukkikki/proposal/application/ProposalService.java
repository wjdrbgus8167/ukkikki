package com.dancing_orangutan.ukkikki.proposal.application;


import com.dancing_orangutan.ukkikki.proposal.application.command.CreateInquiryCommand;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry.InquiryRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.memberTravelPlan.MemberTravelPlanFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule.ScheduleFinder;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CreateInquiryResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CreateProposalResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ProposalDetailResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ScheduleResponse;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProposalService {

    private final ProposalRepository proposalRepository;
    private final ScheduleFinder scheduleFinder;
    private final MemberTravelPlanFinder memberTravelPlanFinder;
    private final ProposalFinder proposalFinder;
    private final InquiryRepository inquiryRepository;

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

    @Transactional
    public CreateInquiryResponse createInquiry(CreateInquiryCommand command) {

        // 사용자가 여행 계획에 참가하고 있는지 확인
        boolean isJoining = memberTravelPlanFinder.isJoiningTravelPlan(
                command.getMemberId(), command.getTravelPlanId());


        if (!isJoining) {
            throw new IllegalArgumentException("회원이 여행 계획에 속하지 않습니다.");
        }

        MemberTravelPlanEntity memberTravelPlan = memberTravelPlanFinder
                .findByTravelPlanIdAndMemberId(command.getTravelPlanId(), command.getMemberId());


        // ProposalEntity 조회
        Proposal proposal = proposalFinder.getProposalDomain(command.getProposalId());

        if (proposal == null) {
            throw new IllegalArgumentException("제안서를 찾을 수 없습니다.");
        }


        Inquiry inquiry = Inquiry.builder()
                .title(command.getTitle())
                .content(command.getContent())
                .createTIme(LocalDateTime.now())
                .proposalId(proposal.getProposalId())
                .memberId(memberTravelPlan.getMemberTravelPlanId().getMemberId())
                .travelPlanId(memberTravelPlan.getMemberTravelPlanId().getTravelPlanId())
                .build();


        Inquiry savedInquiry = inquiryRepository.save(inquiry);


        return CreateInquiryResponse.from(savedInquiry);
    }

}
