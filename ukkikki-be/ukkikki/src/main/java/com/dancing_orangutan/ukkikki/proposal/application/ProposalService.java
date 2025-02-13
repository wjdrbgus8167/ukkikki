package com.dancing_orangutan.ukkikki.proposal.application;

import com.dancing_orangutan.ukkikki.proposal.application.command.*;
import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.traveler.Traveler;
import com.dancing_orangutan.ukkikki.proposal.domain.traveler.TravelerEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.vote.VoteEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurvey;
import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.airport.AirportFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.company.CompanyFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry.InquiryFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry.InquiryRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry.JpaInquiryRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.memberTravelPlan.MemberTravelPlanFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.JpaProposalRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule.JpaScheduleRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule.ScheduleFinder;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule.ScheduleRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.traveler.JpaTravelerRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.vote.JpaVoteRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.voteSurvey.JpaVoteSurveyRepository;
import com.dancing_orangutan.ukkikki.proposal.mapper.ScheduleMapper;
import com.dancing_orangutan.ukkikki.proposal.mapper.TravelerMapper;
import com.dancing_orangutan.ukkikki.proposal.mapper.VoteSurveyMapper;
import com.dancing_orangutan.ukkikki.proposal.ui.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
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
    private final InquiryFinder inquiryFinder;
    private final JpaInquiryRepository jpaInquiryRepository;
    private final ScheduleRepository scheduleRepository;
    private final JpaScheduleRepository jpaScheduleRepository;
    private final ScheduleMapper scheduleMapper;
    private final JpaProposalRepository jpaProposalRepository;
    private final JpaTravelerRepository jpaTravelerRepository;
    private final TravelerMapper travelerMapper;;
    private final JpaVoteSurveyRepository voteSurveyRepository;
    private final VoteSurveyMapper voteSurveyMapper;
    private final JpaVoteRepository voteRepository;
    private final CompanyFinder companyFinder;
    private final AirportFinder airportFinder;

    // 제안서 작성
    @Transactional
   public CreateProposalResponse createProposal(CreateProposalCommand command){

       Proposal domain= Proposal.builder()
               .name(command.getName())
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
               .proposalStatus(ProposalStatus.W)
               .createTime(LocalDateTime.now())
               .updateTime(LocalDateTime.now())
               .companyId(command.getCompanyId())
               .travelPlanId(command.getTravelPlanId())
               .build();

       Proposal savedProposal = proposalRepository.save(domain);

       log.info("Saved proposal {}", savedProposal.getProposalId());

       List<Schedule> schedules = command.getSchedules().stream()
               .map(scheduleCommand -> Schedule.builder()
                       .scheduleName(scheduleCommand.getScheduleName())
                       .startTime(scheduleCommand.getStartDate())
                       .endTime(scheduleCommand.getEndDate())
                       .imageUrl(scheduleCommand.getImageUrl())
                       .proposalId(savedProposal.getProposalId()) // 저장된 Proposal ID 설정
                       .build())
               .collect(Collectors.toList());

       // 새로운 일정 리스트 내부에서 중복 일정이 있는지 확인
       if (Schedule.hasOverlappingSchedules(schedules)) {
           throw new IllegalArgumentException("겹치는 일정이 존재합니다.");
       }

       // 일정 저장 (Batch insert)
       List<Schedule> scheduleList =scheduleRepository.saveAll(schedules);

       return CreateProposalResponse.builder()
               .proposal(savedProposal)
               .schedules(scheduleList)
               .build();
   }

   // 제안서 목록 조회
    @Transactional
    public List<ProposalListResponse> getProposalList(ProposalListCommand command) {

        // 방에 있는 제안서 가져오기
        List<ProposalEntity> proposals = proposalRepository.findByTravelPlanId(command.getTravelPlanId());

        // 응답 리스트 만들기
        List<ProposalListResponse> proposalResponses = proposals.stream()
                .map(proposal -> {
                    Integer proposalId = proposal.getProposalId();

                    // 해당 제안서에 대한 투표 정보 가져오기
                    List<VoteEntity> votes = voteRepository.findByProposal_ProposalId(proposalId)
                            .orElseThrow(()-> new EntityNotFoundException("투표한 제안서가 없습니다"));

                    // 투표한 멤버들의 id 가져오기
                    Set<Integer> votedMemberIds = votes.stream()
                            .map(vote -> vote.getMember().getMemberId())
                            .collect(Collectors.toSet());

                    // 현재 접속한 사용자가 투표했는지 여부 설정
                    boolean votedYn = votedMemberIds.contains(command.getMemberId());

                    // 투표한 멤버들의 여행 계획 정보 가져와서 voteCount 계산
                    int voteCount = votedMemberIds.stream()
                            .map(votedMemberId-> {

                                try {
                                    return memberTravelPlanFinder.findByTravelPlanIdAndMemberId(command.getTravelPlanId(), votedMemberId);
                                } catch (EntityNotFoundException e) {
                                    log.warn("투표한 멤버가 여행 계획에 참여하지 않음: memberId={}, travelPlanId={}", votedMemberId, command.getTravelPlanId());
                                    return null; // 존재하지 않는 멤버는 제외
                                }

                            })
                            .filter(Objects::nonNull) // null 값 제거
                            .mapToInt(mtp -> mtp.getAdultCount() + mtp.getChildCount() + mtp.getInfantCount()) // 투표한 인원 수 합산
                            .sum();

                    // 회사 정보 가져오기
                    String companyName =  companyFinder.getReferenceById(proposal.getCompany().getCompanyId()).getCompanyName();

                    // ProposalListResponse 생성
                    return ProposalListResponse.builder()
                            .proposalId(proposalId)
                            .deposit(proposal.getDeposit())
                            .name(proposal.getName())
                            .companyName(companyName)
                            .voteCount(voteCount)
                            .votedYn(votedYn)
                            .build();

                })// 제안서를 투표 순으로 나열
                .sorted(Comparator.comparingInt(ProposalListResponse::getVoteCount).reversed())
                .collect(Collectors.toList());

        return proposalResponses;
    }

   // 제안서 상세 조회
    public ProposalDetailResponse getProposalDetail(Integer proposalId) {

        ProposalEntity proposal = proposalRepository.findById(proposalId);

        List<ScheduleResponse> schedules = scheduleFinder.findSchedulesByProposalId(proposalId).stream()
                .map(schedule -> new ScheduleResponse(
                        schedule.getScheduleName(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getImageUrl()))
                .collect(Collectors.toList());

        return ProposalDetailResponse.builder()
                .proposalId(proposal.getProposalId())
                .companyId(proposal.getCompany().getCompanyId())
                .name(proposal.getName())
                .airLine(proposal.getAirline())
                .startDate(proposal.getStartDate())
                .endDate(proposal.getEndDate())
                .endDateBoardingTime(proposal.getEndDateBoardingTime())
                .endDateArrivalTime(proposal.getEndDateArrivalTime())
                .startDateBoardingTime(proposal.getStartDateBoardingTime())
                .startDateArrivalTime(proposal.getStartDateArrivalTime())
                .confirmStatus(proposal.getProposalStatus())
                .arrivalAirport(proposal.getArrivalAirport().getAirportName())
                .departureAirport(proposal.getDepartureAirport().getAirportName())
                .minPeople(proposal.getMinPeople())
                .guideIncluded(proposal.isGuideIncluded())
                .deposit(proposal.getDeposit())
                .refundPolicy(proposal.getRefundPolicy())
                .insuranceIncluded(proposal.isInsuranceIncluded())
                .productInformation(proposal.getProductIntroduction())
                .schedules(schedules)
                .build();
    }

    //제안서 문의
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
        ProposalEntity proposal = proposalFinder.getProposalDomain(command.getProposalId());

        if (proposal == null) {
            throw new IllegalArgumentException("제안서를 찾을 수 없습니다.");
        }

        Inquiry inquiry = Inquiry.builder()
                .title(command.getTitle())
                .content(command.getContent())
                .createTIme(LocalDateTime.now())
                .proposalId(proposal.getProposalId())
                .memberId(memberTravelPlan.getMember().getMemberId())
                .travelPlanId(memberTravelPlan.getTravelPlan().getTravelPlanId())
                .build();

        Inquiry savedInquiry = inquiryRepository.save(inquiry);

        return CreateInquiryResponse.from(savedInquiry);
    }

    //제안서 문의 답변
    public CreateInquiryAnswerResponse createInquiryAnswer(CreateInquiryAnswerCommand command) {

        // 제안서 존재 여부 확인
        ProposalEntity proposal = jpaProposalRepository.findByProposalIdAndCompany_CompanyId(command.getProposalId(), command.getCompanyId())
                .orElseThrow(() -> new EntityNotFoundException("해당 제안서를 찾을 수 없거나 접근 권한이 없습니다."));
        log.info("proposal:{}", proposal.getProposalId());
        // 문의 존재 여부 확인
        InquiryEntity inquiry = jpaInquiryRepository.findByInquiryIdAndProposal_ProposalId(command.getInquiryId(), proposal.getProposalId())
                .orElseThrow(() -> new EntityNotFoundException("해당 문의를 찾을 수 없습니다."));

        log.info("inquiry:{}", inquiry.getInquiryId());
        // 3️⃣ 이미 답변이 있는지 확인
        if (inquiry.getAnswer() != null && !inquiry.getAnswer().isEmpty()) {
            throw new IllegalArgumentException("이미 답변이 작성된 문의입니다.");
        }

        // 4️⃣ 답변 저장
        inquiry.updateAnswer(command.getAnswer(),LocalDateTime.now());
        jpaInquiryRepository.save(inquiry);

        // 5️⃣ 응답 반환
        return CreateInquiryAnswerResponse.builder()
                .inquiryId(inquiry.getInquiryId())
                .proposalId(inquiry.getProposal().getProposalId())
                .answer(inquiry.getAnswer())
                .companyId(command.getCompanyId())
                .title(inquiry.getTitle())
                .content(inquiry.getContent())
                .build();

    }

    // 제안서 문의 목록 조회
    public List<InquiryListResponse> getInquiryList(Integer proposalId) {

        // Proposal 존재 여부 확인
        if (proposalRepository.findById(proposalId)==null) {
            throw new IllegalArgumentException("해당 proposalId에 대한 제안서를 찾을 수 없습니다: " + proposalId);
        }

        // InquiryFinder를 사용하여 문의 조회
        List<InquiryEntity> inquiries = inquiryFinder.findByProposalId(proposalId);

        // InquiryEntity → InquiryResponse 변환 후 반환
        return inquiries.stream()
                .map(InquiryListResponse::from)
                .collect(Collectors.toList());
    }

    //여행사 본인 제안서 목록 조회
    public List<CompanyProposalListResponse> getCompanyProposalList(Integer companyId) {

        List<CompanyProposalListResponse> proposals = proposalRepository.findByCompanyId(companyId).stream()
                .map(proposal -> CompanyProposalListResponse.builder()
                        .proposalId(proposal.getProposalId())
                        .travelPlanId(proposal.getTravelPlan().getTravelPlanId())
                        .name(proposal.getName())
                        .startDate(proposal.getStartDate())
                        .endDate(proposal.getEndDate())
                        .airline(proposal.getAirline())
                        .departureAirportName(proposal.getDepartureAirport().getAirportName())
                        .arrivalAirportName(proposal.getArrivalAirport().getAirportName())
                        .deposit(proposal.getDeposit())
                        .minPeople(proposal.getMinPeople())
                        .proposalStatus(proposal.getProposalStatus().name())
                        .createTime(proposal.getCreateTime())
                        .build())
                .collect(Collectors.toList());

        return proposals;
    }

    //여행사 본인 제안서 상세 조회
    public CompanyProposalDetailResponse getCompanyProposalDetail(Integer proposalId,Integer companyId) {

        ProposalEntity proposal = proposalRepository.findByProposalIdAndCompany_CompanyId(proposalId, companyId);

        List<ScheduleResponse> schedules = scheduleFinder.findSchedulesByProposalId(proposal.getProposalId()).stream()
                .map(schedule -> new ScheduleResponse(
                        schedule.getScheduleName(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getImageUrl()))
                .collect(Collectors.toList());

        return CompanyProposalDetailResponse.builder()
                .proposalId(proposal.getProposalId())
                .companyId(proposal.getCompany().getCompanyId())
                .name(proposal.getName())
                .airLine(proposal.getAirline())
                .startDate(proposal.getStartDate())
                .endDate(proposal.getEndDate())
                .endDateBoardingTime(proposal.getEndDateBoardingTime())
                .endDateArrivalTime(proposal.getEndDateArrivalTime())
                .startDateBoardingTime(proposal.getStartDateBoardingTime())
                .startDateArrivalTime(proposal.getStartDateArrivalTime())
                .confirmStatus(proposal.getProposalStatus())
                .arrivalAirport(proposal.getArrivalAirport().getAirportName())
                .departureAirport(proposal.getDepartureAirport().getAirportName())
                .minPeople(proposal.getMinPeople())
                .guideIncluded(proposal.isGuideIncluded())
                .deposit(proposal.getDeposit())
                .refundPolicy(proposal.getRefundPolicy())
                .insuranceIncluded(proposal.isInsuranceIncluded())
                .productInformation(proposal.getProductIntroduction())
                .schedules(schedules)
                .build();
    }

    // 제안서 내 일정 등록
    public Schedule createSchedule(CreateScheduleCommand command,Integer proposalId) {

       // 일정 등록 전 겹치는 일정이 있는지 확인
        ProposalEntity proposal = proposalRepository.findById(proposalId);

        List<Schedule> existingSchedules = scheduleFinder.findSchedulesByProposalId(proposal.getProposalId()).stream()
                .map(scheduleMapper::entityToDomain)
                .collect(Collectors.toList());

        if (Schedule.hasOverlappingSchedules(existingSchedules,command.getStartDate(), command.getEndDate())) {
            throw new IllegalArgumentException("새로운 일정이 기존 일정과 겹칩니다.");
        }

        // 새 일정 추가 후 저장
        Schedule schedule = Schedule.builder()
                .scheduleName(command.getScheduleName())
                .startTime(command.getStartDate())
                .endTime(command.getEndDate())
                .imageUrl(command.getImageUrl())
                .proposalId(proposalId)
                .build();

        return scheduleRepository.save(schedule);
    }

    // 일정 삭제
    public void deleteSchedule(DeleteScheduleCommand command) {

        Optional<ScheduleEntity> optionalScheduleEntity = jpaScheduleRepository.findById(command.getScheduleId());

        ScheduleEntity scheduleEntity = optionalScheduleEntity
                .orElseThrow(() -> new EntityNotFoundException("해당 일정을 찾을 수 없습니다."));

        jpaScheduleRepository.delete(scheduleEntity);

    }

    //일정 수정
    public void updateSchedule(UpdateScheduleCommand command) {

        Optional<ScheduleEntity> optionalScheduleEntity = jpaScheduleRepository.findById(command.getScheduleId());

        ScheduleEntity scheduleEntity = optionalScheduleEntity
                .orElseThrow(() -> new EntityNotFoundException("해당 일정을 찾을 수 없습니다."));

        List<Schedule> existingSchedules = scheduleFinder.findSchedulesByProposalId(scheduleEntity.getProposal().getProposalId()).stream()
                .filter(s -> !s.getScheduleId().equals(scheduleEntity.getScheduleId()))
                .map(scheduleMapper::entityToDomain)
                .collect(Collectors.toList());

        if (Schedule.hasOverlappingSchedules(existingSchedules,command.getStartDate(), command.getEndDate())) {
            throw new IllegalArgumentException("해당 시간대에는 이미 일정이 등록되어 있습니다.");
        }

        // 새 일정 추가 후 저장
        scheduleEntity.updateSchedule(command.getScheduleName(), command.getStartDate(), command.getEndDate(), command.getImageUrl());

        jpaScheduleRepository.save(scheduleEntity);
    }

    // 제안서 투표 시작
    public CreateVoteSurveyResponse createVoteSurvey(CreateVoteSurveyCommand command) {

        // 여행 계획(travelPlanId) 존재 여부 확인
        MemberTravelPlanEntity memberTravelPlan = memberTravelPlanFinder
                .findByTravelPlanIdAndMemberId(command.getTravelPlanId(), command.getMemberId());

        if(memberTravelPlan==null){
            throw new EntityNotFoundException("해당 일정을 찾을 수 없습니다.");
        }

        // memberId가 해당 여행 계획의 호스트인지 확인
        if (!memberTravelPlan.isHostYn()) {
            throw new IllegalArgumentException("투표를 시작할 권한이 없습니다 방장만 투표를 시작할 수 있습니다.");
        }

        // 투표 설문 생성 (현재 시간 기준 +72시간 설정)
        VoteSurveyEntity savedVoteSurvey = VoteSurveyEntity.builder()
                .surveyStartTime(command.getSurveyStartTime())
                .surveyEndTime(command.getSurveyEndTime()) // 72시간 후 종료
                .travelPlan(memberTravelPlan.getTravelPlan())
                .build();

        // 투표 설문 저장
        VoteSurvey voteSurvey = voteSurveyMapper.entityToDomain(voteSurveyRepository.save(savedVoteSurvey));

        return CreateVoteSurveyResponse.builder()
                .surveyStartTime(voteSurvey.getSurveyStartTime())
                .surveyEndTime(voteSurvey.getSurveyEndTime())
                .travelPlanId(memberTravelPlan.getTravelPlan().getTravelPlanId())
                .voteSurveyId(voteSurvey.getVoteSurveyId())
                .build();

    }

    // 제안서 투표
    @Transactional
    public VoteProposalResponse voteProposal(VoteProposalCommand command) {

        // 투표 조사 확인
        VoteSurveyEntity voteSurvey = voteSurveyRepository.findById(command.getVoteSurveyId())
                .orElseThrow(() -> new EntityNotFoundException("해당 여행 계획에 대한 투표 조사가 존재하지 않습니다."));

        LocalDateTime now = LocalDateTime.now();
        if (now.isBefore(voteSurvey.getSurveyStartTime()) || now.isAfter(voteSurvey.getSurveyEndTime())) {
            throw new IllegalArgumentException("현재는 투표 기간이 아닙니다.");
        }

        // 제안서 확인 (투표 진행 중인지 확인)
        ProposalEntity proposal = jpaProposalRepository.findByProposalIdAndTravelPlan_TravelPlanId(
                        command.getProposalId(), voteSurvey.getTravelPlan().getTravelPlanId())
                .orElseThrow(() -> new EntityNotFoundException("해당 제안서를 찾을 수 없습니다."));

        if (!ProposalStatus.V.equals(proposal.getProposalStatus())) {
            throw new IllegalArgumentException("투표가 진행 중인 제안서가 아닙니다.");
        }

        // 여행자가 해당 여행 계획에 포함되어 있는지 확인
        MemberTravelPlanEntity memberTravelPlan = memberTravelPlanFinder.findByTravelPlanIdAndMemberId(
                voteSurvey.getTravelPlan().getTravelPlanId(), command.getMemberId());

        log.info("voteSurvey:{}",voteSurvey.getTravelPlan().getTravelPlanId());
        log.info("memberid:{}",command.getMemberId());
        log.info("memberPlanId:{}",memberTravelPlan.getMember().getMemberId());

        if (memberTravelPlan == null) {
            throw new EntityNotFoundException("해당 여행 계획에 참여된 회원이 아닙니다.");
        }

        // 이미 투표했는지 확인
        boolean hasAlreadyVoted = voteRepository.existsByVoteSurvey_VoteSurveyIdAndMember_MemberId(
                command.getVoteSurveyId(), command.getMemberId());

        if (hasAlreadyVoted) {
            throw new IllegalArgumentException("이미 투표를 진행한 회원입니다.");
        }

        // 투표 저장
        VoteEntity vote = VoteEntity.builder()
                .proposal(proposal)
                .voteSurvey(voteSurvey)
                .member(memberTravelPlan.getMember())
                .voteTime(now)
                .build();

        VoteEntity savedVote = voteRepository.save(vote);

        // 응답 반환
        return VoteProposalResponse.builder()
                .voteId(savedVote.getVoteId())
                .proposalId(savedVote.getProposal().getProposalId())
                .voteSurveyId(savedVote.getVoteSurvey().getVoteSurveyId())
                .voteTime(savedVote.getVoteTime())
                .build();
    }

    // 제안서 확정하기
    public ConfirmProposalResponse confirmProposal(Integer travelPlanId) {

        // 방에 있는 제안서 가져오기
        List<ProposalEntity> proposals = proposalRepository.findByTravelPlanId(travelPlanId);

        //제안서
        List<ConfirmProposalResponse> confirmProposalResponses = proposals.stream()
                .map(proposal -> {
                    Integer proposalId = proposal.getProposalId();

                    // 해당 제안서에 대한 투표 정보 가져오기
                    List<VoteEntity> votes = voteRepository.findByProposal_ProposalId(proposalId)
                            .orElseThrow(()-> new EntityNotFoundException("투표한 제안서가 없습니다"));

                    // 투표한 멤버들의 id 가져오기
                    Set<Integer> votedMemberIds = votes.stream()
                            .map(vote -> vote.getMember().getMemberId())
                            .collect(Collectors.toSet());

                    // 투표한 멤버들의 여행 계획 정보 가져와서 voteCount 계산
                    int voteCount = votedMemberIds.stream()
                            .map(votedMemberId-> {

                                try {
                                    return memberTravelPlanFinder.findByTravelPlanIdAndMemberId(travelPlanId, votedMemberId);
                                } catch (EntityNotFoundException e) {
                                    log.warn("투표한 멤버가 여행 계획에 참여하지 않음: memberId={}, travelPlanId={}", votedMemberId, travelPlanId);
                                    return null; // 존재하지 않는 멤버는 제외
                                }

                            })
                            .filter(Objects::nonNull) // null 값 제거
                            .mapToInt(mtp -> mtp.getAdultCount() + mtp.getChildCount() + mtp.getInfantCount()) // 투표한 인원 수 합산
                            .sum();

                    // ProposalListResponse 생성
                    return ConfirmProposalResponse.builder()
                            .proposalId(proposalId)
                            .deposit(proposal.getDeposit())
                            .name(proposal.getName())
                            .voteCount(voteCount)
                            .build();

                })// 제안서를 투표 순으로 나열
                .sorted(Comparator.comparingInt(ConfirmProposalResponse::getVoteCount)
                        .reversed()
                        .thenComparingInt(ConfirmProposalResponse::getDeposit))
                .collect(Collectors.toList());

        ConfirmProposalResponse topProposal = confirmProposalResponses.get(0);

        // 제안서 상태 업데이트 (최다 득표 제안서는 A, 나머지는 D)
        proposals.forEach(proposal -> proposal.updateStatus(proposal.getProposalId().equals(topProposal.getProposalId())));

        // 배치 업데이트
        jpaProposalRepository.saveAll(proposals);

        //최다 득표 제안서 정보 반환
        return ConfirmProposalResponse.builder()
                .proposalId(topProposal.getProposalId())
                .name(topProposal.getName())
                .deposit(topProposal.getDeposit())
                .voteCount(topProposal.getVoteCount())
                .status(ProposalStatus.A) // 확정된 제안서는 A 상태
                .build();
    }

    // 일정 확정 후 여행자 등록
    public List<Traveler> createTravelers(List<CreateTravelerCommand> commands) {

        if (commands.isEmpty()) {
            throw new IllegalArgumentException("등록할 여행자 정보가 없습니다.");
        }

        // 해당 travelPlanId 내에서 수락된(A) 제안서인지 확인
        ProposalEntity proposal = jpaProposalRepository.findByProposalIdAndTravelPlan_TravelPlanIdAndProposalStatus(
                commands.get(0).getProposalId(), commands.get(0).getTravelPlanId(), ProposalStatus.A
        ).orElseThrow(() -> new EntityNotFoundException("해당 여행 계획에 수락된 제안서가 없습니다."));

        // MemberTravelPlan 조회 (여행 계획과 회원 간의 관계 확인)
        MemberTravelPlanEntity memberTravelPlan = memberTravelPlanFinder.findByTravelPlanIdAndMemberId(
                commands.get(0).getTravelPlanId(), commands.get(0).getMemberId());

        if (memberTravelPlan == null) {
            throw new EntityNotFoundException("해당 여행 계획에 참여되어 있지 않습니다.");
        }

        // 기존에 등록된 여행자 목록 조회 (중복 체크를 위해)
        List<TravelerEntity> existingTravelers = jpaTravelerRepository.findByProposal_ProposalId(proposal.getProposalId());

        Set<String> existingPassportNumbers = existingTravelers.stream()
                .map(TravelerEntity::getPassportNumber)  // 여권번호만 저장
                .collect(Collectors.toSet());

        // 신규 등록할 여행자 리스트
        List<TravelerEntity> travelersToSave = new ArrayList<>();

        for (CreateTravelerCommand command : commands) {
            if (existingPassportNumbers.contains(command.getPassportNumber())) {
                throw new IllegalArgumentException("이미 등록된 여행자입니다: " + command.getKoreanName());
            }

            TravelerEntity traveler = TravelerEntity.builder()
                    .koreanName(command.getKoreanName())
                    .englishName(command.getEnglishName())
                    .passportNumber(command.getPassportNumber())
                    .expirationDate(command.getExpirationDate())  // 여권 만료일 저장 (중복 체크 X)
                    .birthDate(command.getBirthDate())
                    .phoneNumber(command.getPhoneNumber())
                    .proposal(proposal)
                    .memberTravelPlan(memberTravelPlan)
                    .build();

            travelersToSave.add(traveler);
        }

        // 중복 없는 경우만 저장
        jpaTravelerRepository.saveAll(travelersToSave);

        // Domain 객체로 변환 후 반환
        return travelersToSave.stream()
                .map(travelerMapper::entityToDomain)
                .collect(Collectors.toList());
    }
}
