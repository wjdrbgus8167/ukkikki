package com.dancing_orangutan.ukkikki.proposal.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.*;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateInquiryRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateProposalRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateScheduleRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.request.UpdateScheduleRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CreateInquiryResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.InquiryListResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ProposalDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/travel-plans/{travelPlanId}/proposals")

public class ProposalController {

    private final ProposalService proposalService;

    // 제안서 작성
    @PostMapping
    public ApiUtils.ApiResponse<Proposal> createProposal(
            @PathVariable Integer travelPlanId,
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails,
            @Validated @RequestBody CreateProposalRequest request){

        if (request == null || request.getProposalRequest() == null) {
            throw new IllegalArgumentException("Request body or proposalRequest is missing!");
        }

        CreateProposalCommand command = request.toCommand(travelPlanId, companyUserDetails.getCompanyId());

        return ApiUtils.success(proposalService.createProposal(command));
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

        CreateScheduleCommand command = request.requestToDomain(proposalId);

        return ApiUtils.success(proposalService.createSchedule(command));
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

}
