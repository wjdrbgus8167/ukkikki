package com.dancing_orangutan.ukkikki.proposal.application;

import com.dancing_orangutan.ukkikki.event.eventPublisher.SpringEventPublisher;
import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.proposal.application.command.*;
import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.event.ProposalVoteSurveyStartEvent;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.session.SessionEntity;
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
import com.dancing_orangutan.ukkikki.proposal.infrastructure.session.SessionRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.traveler.JpaTravelerRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.vote.JpaVoteRepository;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.voteSurvey.JpaVoteSurveyRepository;
import com.dancing_orangutan.ukkikki.proposal.mapper.ScheduleMapper;
import com.dancing_orangutan.ukkikki.proposal.mapper.TravelerMapper;
import com.dancing_orangutan.ukkikki.proposal.mapper.VoteSurveyMapper;
import com.dancing_orangutan.ukkikki.proposal.ui.response.*;
import com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravelPlan.MemberTravelPlanEntity;
import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final SpringEventPublisher eventPublisher;
    private final JpaVoteSurveyRepository jpaVoteSurveyRepository;
    private final SessionRepository sessionRepository;
    private OpenVidu openVidu;

    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        log.info("OpenVidu 초기화 완료");
    }

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

       List<Schedule> schedules = command.getScheduleItems().stream()
               .map(scheduleCommand -> Schedule.builder()
                       .scheduleName(scheduleCommand.getScheduleName())
                       .startTime(scheduleCommand.getStartDate())
                       .endTime(scheduleCommand.getEndDate())
                       .imageUrl(scheduleCommand.getImageUrl())
                       .longitude(scheduleCommand.getLongitude())
                       .latitude(scheduleCommand.getLatitude())
                       .dayNumber(scheduleCommand.getDayNumber())
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

    // 제안서에 대한 화상 회의 세션 생성
    @Transactional
    public void createSessionForProposal(Integer proposalId) {
        log.info("화상 회의 세션 생성 시작 - proposalId: {}", proposalId);
        // 1) 세션 생성
        SessionProperties props = new SessionProperties.Builder().build();
        try {
            Session session = openVidu.createSession(props);
            String sessionId = session.getSessionId();
            log.info("OpenVidu 세션 생성 성공 - sessionId: {}", sessionId);

            // 2) DB에 sessionId 저장
            SessionEntity sessionEntity = SessionEntity.builder()
                    .proposalId(proposalId)
                    .sessionId(sessionId)
                    .build();
            sessionRepository.save(sessionEntity);
            log.info("세션 정보 DB 저장 성공 - proposalId: {}, sessionId: {}", proposalId, sessionId);

        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error("세션 생성 실패 - proposalId: {}", proposalId, e);
            throw new RuntimeException("OpenVidu 세션 생성에 실패했습니다.", e);
        }
    }

    /**
     * proposalId를 받아서 세션이 이미 있으면 재사용, 없으면 생성.
     * -> 화상 회의 페이지에서 토큰 요청 시 사용 가능
     */
    @Transactional
    public String getOrCreateSession(Integer proposalId) {
        log.info("getOrCreateSession 호출 - proposalId: {}", proposalId);
        synchronized (this) { // 동기화 블록 적용
            return sessionRepository.findByProposalId(proposalId)
                    .map(SessionEntity::getSessionId)
                    .orElseGet(() -> {
                        log.info("세션 없음 - 새 세션 생성 중 - proposalId: {}", proposalId);
                        createSessionForProposal(proposalId);
                        return sessionRepository.findByProposalId(proposalId)
                                .orElseThrow(() -> {
                                    log.error("새 세션 생성 실패 - proposalId: {}", proposalId);
                                    return new RuntimeException("OpenVidu 세션 생성에 실패했습니다.");
                                })
                                .getSessionId();
                    });
        }
    }
    
    /**
     * 토큰 생성 로직
     * @param isHost = true -> PUBLISHER(여행사)
     * @param isHost = false -> SUBSCRIBER(유저)
     */
    public String generateToken(Integer proposalId, boolean isHost, String memberName) {
        try {
            String sessionId = getOrCreateSession(proposalId);
            log.info("토큰 생성 시작 - proposalId: {}, sessionId: {}", proposalId, sessionId);

            // 활성 세션 확인
            Session session = openVidu.getActiveSession(sessionId);
            if (session == null) {
                log.warn("활성 세션 없음 - proposalId: {}, sessionId: {}. 새 세션 생성 시도", proposalId, sessionId);
                sessionId = createNewSessionManually(proposalId);
                log.info("새 세션 생성 후 sessionId: {}", sessionId);
                session = openVidu.getActiveSession(sessionId);
                if (session == null) {
                    log.error("새로 생성한 세션도 활성 상태가 아님 - proposalId: {}, sessionId: {}", proposalId, sessionId);
                    throw new RuntimeException("새로 생성한 OpenVidu 세션이 활성 상태가 아닙니다.");
                }
            } else {
                log.info("활성 세션 존재 - proposalId: {}, sessionId: {}", proposalId, sessionId);
            }

            ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                    .role(isHost ? OpenViduRole.PUBLISHER : OpenViduRole.SUBSCRIBER)
                    .data(memberName)
                    .build();
            log.info("ConnectionProperties 생성 - role: {}, memberName: {}",
                    isHost ? "PUBLISHER" : "SUBSCRIBER", memberName);

            Connection connection = session.createConnection(connectionProperties);
            log.info("토큰 생성 성공 - proposalId: {}, token: {}", proposalId, connection.getToken());
            return connection.getToken();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error("토큰 생성 실패 - proposalId: {}, memberName: {}", proposalId, memberName, e);
            throw new RuntimeException("토큰 생성에 실패했습니다.", e);
        }
    }

    private String createNewSessionManually(Integer proposalId)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.info("createNewSessionManually 시작 - proposalId: {}", proposalId);
        Session session = openVidu.createSession();
        String newSessionId = session.getSessionId();
        log.info("새 세션 생성됨 - newSessionId: {}", newSessionId);
        // 기존 sessionId 업데이트
        SessionEntity sessionEntity = sessionRepository.findByProposalId(proposalId)
                .orElseThrow(() -> new RuntimeException("세션 기록이 발견되지 않았습니다."));
        sessionEntity.setSessionId(newSessionId);
        sessionRepository.save(sessionEntity);
        log.info("세션 DB 업데이트 성공 - proposalId: {}, newSessionId: {}", proposalId, newSessionId);
        return newSessionId;
    }

    /**
     * 호스트 접속 여부 체크 (PUBLISHER가 연결되어 있으면 true)
     */
    public boolean isHostConnected(Integer proposalId) {
        SessionEntity sessionEntity = sessionRepository.findByProposalId(proposalId)
                .orElse(null);
        if (sessionEntity == null) {
            log.warn("호스트 접속 여부 체크: 세션 정보 없음 - proposalId: {}", proposalId);
            return false;
        }
        Session session = openVidu.getActiveSession(sessionEntity.getSessionId());
        if (session == null) {
            log.info("호스트 접속 여부 체크: 활성 세션 없음 - proposalId: {}, sessionId: {}", proposalId, sessionEntity.getSessionId());
            return false;
        }
        boolean hostConnected = session.getConnections().stream()
                .anyMatch(connection -> connection.getRole() == OpenViduRole.PUBLISHER);
        log.info("호스트 접속 여부 체크 결과 - proposalId: {}, hostConnected: {}", proposalId, hostConnected);
        return hostConnected;
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
                            .mapToInt(mtp -> Math.min(mtp.getAdultCount() + mtp.getChildCount() + mtp.getInfantCount(), 10)) // 투표한 인원 수 합산
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
                            .proposalStatus(proposal.getProposalStatus())
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
                        schedule.getImageUrl(),
                        schedule.getDayNumber(),
                        schedule.getLatitude(),
                        schedule.getLongitude(),
                        schedule.getScheduleId()))
                .collect(Collectors.toList());

        List<ProposalDetailResponse.DayResponse> dayResponses = schedules.stream()
                .collect(Collectors.groupingBy(ScheduleResponse::getDayNumber))
                .entrySet().stream()
                .map(entry -> ProposalDetailResponse.DayResponse.builder()
                        .dayNumber(Integer.valueOf(entry.getKey()))
                        .schedules(entry.getValue())
                        .build())
                .sorted(Comparator.comparing(ProposalDetailResponse.DayResponse::getDayNumber))
                .collect(Collectors.toList());

        return ProposalDetailResponse.builder()
                .proposalId(proposal.getProposalId())
                .companyId(proposal.getCompany().getCompanyId())
                .travelPlanId(proposal.getTravelPlan().getTravelPlanId())
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
                .companyName(proposal.getCompany().getCompanyName())
                .departureAirportCode(proposal.getDepartureAirport().getAirportCode())
                .arrivalAirportCode(proposal.getArrivalAirport().getAirportCode())
                .daySchedules(dayResponses)
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
        ProposalEntity proposal = jpaProposalRepository.findByProposalId(command.getProposalId())
                .orElseThrow(() -> new EntityNotFoundException("해당 제안서를 찾을 수 없거나 접근 권한이 없습니다."));
        log.info("proposal:{}", proposal.getProposalId());

        // 문의 존재 여부 확인
        InquiryEntity inquiry = jpaInquiryRepository.findByInquiryIdAndProposal_ProposalId(command.getInquiryId(), proposal.getProposalId())
                .orElseThrow(() -> new EntityNotFoundException("해당 문의를 찾을 수 없습니다."));

        log.info("inquiry:{}", inquiry.getInquiryId());

        // 4️⃣ 답변 저장
        inquiry.updateAnswer(command.getAnswer(),LocalDateTime.now());
        jpaInquiryRepository.save(inquiry);

        // 5️⃣ 응답 반환
        return CreateInquiryAnswerResponse.builder()
                .inquiryId(inquiry.getInquiryId())
                .proposalId(inquiry.getProposal().getProposalId())
                .answer(inquiry.getAnswer())
                .companyId(proposal.getCompany().getCompanyId())
                .title(inquiry.getTitle())
                .content(inquiry.getContent())
                .companyName(proposal.getCompany().getCompanyName())
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
    public List<CompanyProposalListResponse> getCompanyProposalList(ProposalStatus status, Integer companyId) {

        List<ProposalEntity> proposals = (status == null) ?
                proposalRepository.findByCompanyId(companyId) :
                proposalRepository.findByCompanyIdAndProposalStatus(companyId, status);

        return  proposals.stream()
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
    }

    //여행사 본인 제안서 상세 조회
    public CompanyProposalDetailResponse getCompanyProposalDetail(Integer proposalId) {

        // 제안서 조회
        ProposalEntity proposal = proposalRepository.findByProposalId(proposalId);

        //스케줄 조회 및 그룹핑 (dayNumber 기준)
        List<ScheduleResponse> schedules = scheduleFinder.findSchedulesByProposalId(proposal.getProposalId()).stream()
                .map(schedule -> new ScheduleResponse(
                        schedule.getScheduleName(),
                        schedule.getStartTime(),
                        schedule.getEndTime(),
                        schedule.getImageUrl(),
                        schedule.getDayNumber(),
                        schedule.getLatitude(),
                        schedule.getLongitude(),
                        schedule.getScheduleId()))
                .collect(Collectors.toList());

        //dayNumber 기준으로 그룹핑
        List<CompanyProposalDetailResponse.CompanyDayResponse> companyDayResponses = schedules.stream()
                .filter(schedule -> schedule.getDayNumber() != null) // dayNumber가 null이 아닌 경우만 처리
                .collect(Collectors.groupingBy(ScheduleResponse::getDayNumber))
                .entrySet().stream()
                .map(entry -> CompanyProposalDetailResponse.CompanyDayResponse.builder()
                        .dayNumber(Integer.valueOf(entry.getKey())) // dayNumber
                        .schedules(entry.getValue()) // 해당 일차의 스케줄 리스트
                        .build())
                .sorted(Comparator.comparing(CompanyProposalDetailResponse.CompanyDayResponse::getDayNumber))
                .collect(Collectors.toList());

        // 최종 응답 반환
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
                .companyDaySchedules(companyDayResponses) // day별 스케줄 추가
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
        log.info("일차:{}",command.getDayNumber());
        // 새 일정 추가 후 저장
        Schedule schedule = Schedule.builder()
                .scheduleName(command.getScheduleName())
                .startTime(command.getStartDate())
                .endTime(command.getEndDate())
                .imageUrl(command.getImageUrl())
                .dayNumber(command.getDayNumber())
                .latitude(command.getLatitude())
                .longitude(command.getLongitude())
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
        scheduleEntity.updateSchedule(command.getScheduleName(), command.getStartDate(), command.getEndDate(), command.getImageUrl(),command.getDayNumber()
                ,command.getLatitude(),command.getLongitude());

        jpaScheduleRepository.save(scheduleEntity);
    }

    //제안서 수정 (일정 포함)
    public void updateProposal(UpdateProposalCommand command) {

        log.info("command:{}", command);

        // Proposal 조회
        ProposalEntity proposal = proposalRepository.findById(command.getProposalId());
        if (proposal == null) {
            throw new EntityNotFoundException("해당 제안서를 찾을 수 없습니다.");
        }

        if (ProposalStatus.D.equals(proposal.getProposalStatus()) || ProposalStatus.V.equals(proposal.getProposalStatus())) {
            throw new IllegalArgumentException("제안서가 거절 또는 진행 상태일 때 수정이 불가합니다.");
        }

        // Proposal 기본 정보 업데이트
        proposal.updateProposal(
                proposal.getProposalId(),
                command.getName(),
                command.getStartDate(),
                command.getEndDate(),
                command.getAirline(),
                command.getStartDateBoardingTime(),
                command.getStartDateArrivalTime(),
                command.getEndDateBoardingTime(),
                command.getEndDateArrivalTime(),
                command.getDeposit(),
                command.getMinPeople(),
                command.isGuideIncluded(),
                command.getProductIntroduction(),
                command.getRefundPolicy(),
                command.isInsuranceIncluded(),
                command.getProposalStatus(),
                proposal.getCreateTime(),
                LocalDateTime.now(),
                proposal.getCompany(),
                proposal.getTravelPlan(),
                proposal.getDepartureAirport(),
                proposal.getArrivalAirport()
        );

        log.info("proposal:{}", proposal);

        // Step 1: 요청된 scheduleItems 내에서 겹치는지 검사
        // 요청된 일정들 중에서 겹치는지 확인
        if (Schedule.hasOverlappingSchedules(
                command.getScheduleItems().stream()
                        .map(scheduleCommand -> Schedule.builder()
                                .scheduleName(scheduleCommand.getScheduleName())
                                .startTime(scheduleCommand.getStartDate())
                                .endTime(scheduleCommand.getEndDate())
                                .imageUrl(scheduleCommand.getImageUrl())
                                .dayNumber(scheduleCommand.getDayNumber())
                                .latitude(scheduleCommand.getLatitude())
                                .longitude(scheduleCommand.getLongitude())
                                .build())
                        .collect(Collectors.toList()))
        ) {
            throw new IllegalArgumentException("요청된 일정들 중 겹치는 일정이 있습니다.");
        }


        // Step 2: 기존 스케줄 조회 및 Map 변환
        List<ScheduleEntity> existingSchedules = jpaScheduleRepository.findByProposal_ProposalId(command.getProposalId());
        Map<Integer, ScheduleEntity> existingScheduleMap = existingSchedules.stream()
                .collect(Collectors.toMap(ScheduleEntity::getScheduleId, schedule -> schedule));

        // 요청된 일정 ID 추적
        Set<Integer> incomingScheduleIds = new HashSet<>();

        // Step 3: 요청된 일정 처리
        for (UpdateScheduleCommand scheduleCommand : command.getScheduleItems()) {
            Integer currentScheduleId = scheduleCommand.getScheduleId();

            if (currentScheduleId != null && existingScheduleMap.containsKey(currentScheduleId)) {
                // 기존 일정 업데이트
                ScheduleEntity existingSchedule = existingScheduleMap.get(currentScheduleId);
                existingSchedule.updateSchedule(
                        scheduleCommand.getScheduleName(),
                        scheduleCommand.getStartDate(),
                        scheduleCommand.getEndDate(),
                        scheduleCommand.getImageUrl(),
                        scheduleCommand.getDayNumber(),
                        scheduleCommand.getLatitude(),
                        scheduleCommand.getLongitude()
                );
                incomingScheduleIds.add(currentScheduleId);
            } else {
                // 새로운 일정 생성
                ScheduleEntity newSchedule = ScheduleEntity.builder()
                        .scheduleName(scheduleCommand.getScheduleName())
                        .startTime(scheduleCommand.getStartDate())
                        .endTime(scheduleCommand.getEndDate())
                        .imageUrl(scheduleCommand.getImageUrl())
                        .dayNumber(scheduleCommand.getDayNumber())
                        .latitude(scheduleCommand.getLatitude())
                        .longitude(scheduleCommand.getLongitude())
                        .proposal(proposal)
                        .build();
                jpaScheduleRepository.save(newSchedule);
            }
        }

        // Step 4: 기존 스케줄 중 요청에 없는 일정 삭제
        existingSchedules.stream()
                .filter(schedule -> !incomingScheduleIds.contains(schedule.getScheduleId()))
                .forEach(jpaScheduleRepository::delete);
    }

    // 제안서 투표 시작
    @Transactional
    public void createVoteSurvey(CreateVoteSurveyCommand command) {
        // 제안서 불러오기
        List<ProposalEntity> proposals = proposalRepository.findByTravelPlanId(command.getTravelPlanId());
        if (proposals.isEmpty()) {
            throw new ApiException(ErrorCode.NO_PROPOSALS_FOR_TRAVEL_PLAN);
        }

        // 투표 설문 생성
        VoteSurveyEntity savedVoteSurvey = VoteSurveyEntity.builder()
                .surveyStartTime(command.getSurveyStartTime())
                .surveyEndTime(command.getSurveyEndTime()) // 72시간 후 종료
                .travelPlan(proposals.get(0).getTravelPlan())
                .build();

        // 투표 설문 저장
        VoteSurvey voteSurvey = voteSurveyMapper.entityToDomain(voteSurveyRepository.save(savedVoteSurvey));
        proposals.forEach(ProposalEntity::updateVotingStatus);

        // 배치 업데이트
        jpaProposalRepository.saveAll(proposals);

        ProposalVoteSurveyStartEvent event = ProposalVoteSurveyStartEvent.builder()
                .closeTime(command.getSurveyEndTime())
                .travelPlanId(command.getTravelPlanId())
                .build();

        eventPublisher.publish(event);
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
        ProposalEntity proposal = jpaProposalRepository.findByProposalId(commands.get(0).getProposalId()
        ).orElseThrow(() -> new EntityNotFoundException("해당 여행 계획에 수락된 제안서가 없습니다."));

        Set<String> passportNumbers = new HashSet<>();
        for (CreateTravelerCommand command : commands) {
            if (!passportNumbers.add(command.getPassportNumber())) {
                throw new ApiException(ErrorCode.TRAVELER_PASSPORT_DUPLICATION);
            }
        }

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

    public List<TravelerPassportResponse> getTravelerPassportList(Integer proposalId) {
        return jpaTravelerRepository.findByProposal_ProposalId(proposalId).stream()
                .map(traveler -> TravelerPassportResponse.builder()
                        .travelerId(traveler.getTravelerId())
                        .koreanName(traveler.getKoreanName())
                        .englishName(traveler.getEnglishName())
                        .passportNumber(traveler.getPassportNumber())
                        .expirationDate(traveler.getExpirationDate())
                        .birthDate(traveler.getBirthDate())
                        .phoneNumber(traveler.getPhoneNumber())
                        .build())
                .collect(Collectors.toList());
    }

    // 투표 상태 조회
    public VoteSurveyStatusResponse getVoteSurveyStatus(Integer travelPlanId){

        VoteSurveyEntity voteSurveyEntity = jpaVoteSurveyRepository.findById(travelPlanId)
                .orElseThrow(()-> new EntityNotFoundException("투표 중이 아닙니다"));


        return VoteSurveyStatusResponse.builder()
                .voteSurveyId(voteSurveyEntity.getVoteSurveyId())
                .surveyStartTime(voteSurveyEntity.getSurveyStartTime())
                .surveyEndTime(voteSurveyEntity.getSurveyEndTime())
                .travelPlanId(travelPlanId)
                .build();
    }

    @Transactional
    public TravelPlanCountResponse getTravelPlanCount(Integer travelPlanId) {

        List<MemberTravelPlanEntity> memberTravelPlans = memberTravelPlanFinder.findByTravelPlan_TravelPlanIdAndExitYnFalse(travelPlanId);

        int totalParticipants = memberTravelPlans.stream()
                .mapToInt(MemberTravelPlanEntity::calTotalParticipants)
                .sum();

        return TravelPlanCountResponse.builder()
                .travelPlanId(travelPlanId)
                .count(totalParticipants)
                .build();
    }
}
