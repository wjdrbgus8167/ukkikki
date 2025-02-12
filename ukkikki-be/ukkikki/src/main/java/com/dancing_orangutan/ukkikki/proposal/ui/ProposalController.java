package com.dancing_orangutan.ukkikki.proposal.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.*;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.traveler.Traveler;
import com.dancing_orangutan.ukkikki.proposal.ui.request.*;
import com.dancing_orangutan.ukkikki.proposal.ui.response.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/travel-plans/{travelPlanId}/proposals")

public class ProposalController {

    private final ProposalService proposalService;

    // 제안서 작성
    @PostMapping
    public ApiUtils.ApiResponse<CreateProposalResponse> createProposal(
            @PathVariable Integer travelPlanId,
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails,
            @Validated @RequestBody CreateProposalRequest request){

        CreateProposalCommand command = request.toCommand(travelPlanId, companyUserDetails.getCompanyId());

        return ApiUtils.success(proposalService.createProposal(command));
    }

    // 제안서 목록 조회
    @GetMapping
    public ApiUtils.ApiResponse<List<ProposalListResponse>> getProposalList(
            @PathVariable Integer travelPlanId,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){

        ProposalListCommand command = ProposalListCommand.builder()
                .travelPlanId(travelPlanId)
                .memberId(memberUserDetails.getMemberId())
                .build();

        List<ProposalListResponse> response = proposalService.getProposalList(command);

        return ApiUtils.success(response);
    }
    // 제안서 상세 조회
    @GetMapping("/{proposalId}")
    public ApiUtils.ApiResponse<ProposalDetailResponse> getProposalDetail(
            @PathVariable Integer proposalId) {

        ProposalDetailResponse response = proposalService.getProposalDetail(proposalId);

        return ApiUtils.success(response);
    }

    // 제안서 문의 작성
    @PostMapping("/{proposalId}/inquiries")
    public ApiUtils.ApiResponse<CreateInquiryResponse> createInquiry(
            @PathVariable Integer travelPlanId,
            @PathVariable Integer proposalId,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails,
            @Validated @RequestBody CreateInquiryRequest request) {

        CreateInquiryCommand command = request.requestToDomain(proposalId,travelPlanId,memberUserDetails.getMemberId());

        return ApiUtils.success(proposalService.createInquiry(command));
    }

    // 제안서 문의 목록 조회
    @GetMapping("/{proposalId}/inquiries")
    public ApiUtils.ApiResponse<List<InquiryListResponse>> getInquiryList(
            @PathVariable Integer proposalId) {

        List<InquiryListResponse> inquiries = proposalService.getInquiryList(proposalId);

        return ApiUtils.success(inquiries);
    }

    // 일정등록
    @PostMapping("/{proposalId}/schedules")
    public ApiUtils.ApiResponse<Schedule> createSchedule(
        @PathVariable Integer proposalId,
        @AuthenticationPrincipal CompanyUserDetails companyUserDetails,
        @Validated @RequestBody CreateScheduleRequest request
    ){

        CreateScheduleCommand command = request.toCommand();

        return ApiUtils.success(proposalService.createSchedule(command,proposalId));
    }

    // 일정 삭제
    @DeleteMapping("/{proposalId}/schedules/{scheduleId}")
    public ApiUtils.ApiResponse<?> deleteSchedule(
            @PathVariable Integer proposalId,
            @PathVariable Integer scheduleId
    ){

        DeleteScheduleCommand command  = DeleteScheduleCommand.builder()
                .proposalId(proposalId)
                .scheduleId(scheduleId)
                .build();

        try{
            proposalService.deleteSchedule(command);

            return ApiUtils.success("일정 삭제완료.");
        }catch (Exception e){

            return ApiUtils.error("일정 삭제 실패", e, HttpStatus.BAD_REQUEST);
        }
    }

    //일정 수정
    @PutMapping("/{proposalId}/schedules/{scheduleId}")
    public ApiUtils.ApiResponse<?> updateSchedule(
            @PathVariable Integer proposalId,
            @PathVariable Integer scheduleId,
            @Validated @RequestBody UpdateScheduleRequest request
    ){

       UpdateScheduleCommand command = request.requestToDomain(proposalId,scheduleId);

       proposalService.updateSchedule(command);

       return ApiUtils.success("일정이 변경되었습니다");
    }

    // 투표 시작하기
    @PostMapping("/{proposalId}/vote-survey")
    public ApiUtils.ApiResponse<CreateVoteSurveyResponse> voteSurvey(
            @PathVariable Integer travelPlanId,
            @PathVariable Integer proposalId,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){
        CreateVoteSurveyCommand command =CreateVoteSurveyCommand.builder()
                .surveyStartTime(LocalDateTime.now())
                .surveyEndTime(LocalDateTime.now().plusHours(72))
                .travelPlanId(travelPlanId)
                .proposalId(proposalId)
                .memberId(memberUserDetails.getMemberId())
                .build();

        CreateVoteSurveyResponse response = proposalService.createVoteSurvey(command);

        return ApiUtils.success(response);
    }

    // 투표하기
    @PostMapping("/{proposalId}/vote-survey/{voteSurveyId}")
    public ApiUtils.ApiResponse<VoteProposalResponse> voteSurvey(
            @PathVariable Integer travelPlanId,
            @PathVariable Integer proposalId,
            @PathVariable Integer voteSurveyId,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails
    ){
        VoteProposalCommand command = VoteProposalCommand.builder()
                .travelerId(travelPlanId)
                .proposalId(proposalId)
                .memberId(memberUserDetails.getMemberId())
                .voteSurveyId(voteSurveyId)
                .build();

        VoteProposalResponse response = proposalService.voteProposal(command);

        return ApiUtils.success(response);
    }

    // 확정 제안서에 관한 여행자 등록
    @PostMapping("/{proposalId}/travelers")
    public ApiUtils.ApiResponse<List<Traveler>> createTravelers(
            @PathVariable Integer travelPlanId,
            @PathVariable Integer proposalId,
            @AuthenticationPrincipal MemberUserDetails memberUserDetails,
            @Validated @RequestBody List<CreateTravelerRequest> requests) {

        // 요청된 모든 여행자 정보를 CreateTravelerCommand로 변환
        List<CreateTravelerCommand> command = requests.stream()
                .map(request -> request.toCommand(travelPlanId, proposalId, memberUserDetails.getMemberId()))
                .collect(Collectors.toList());

        // 여러 여행자 등록
        List<Traveler> travelers = proposalService.createTravelers(command);

        return ApiUtils.success(travelers);
    }
}
