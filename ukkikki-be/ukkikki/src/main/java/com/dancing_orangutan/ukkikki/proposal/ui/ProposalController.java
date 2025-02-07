package com.dancing_orangutan.ukkikki.proposal.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.security.MemberUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateInquiryCommand;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateScheduleCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateInquiryRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateProposalRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateScheduleRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CreateInquiryResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.InquiryListResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ProposalDetailResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
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
}
