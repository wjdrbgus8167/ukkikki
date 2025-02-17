package com.dancing_orangutan.ukkikki.proposal.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CompanyProposalDetailResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CompanyProposalListResponse;
import com.dancing_orangutan.ukkikki.proposal.ui.response.TravelerPassportResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Slf4j
@RequestMapping("/proposals")
public class CompanyProposalController {

    private final ProposalService proposalService;

    //여행사 제안서 리스트 조회
    @GetMapping
    public ApiUtils.ApiResponse<List<CompanyProposalListResponse>> getCompanyProposalList(
            @RequestParam(value = "status", required = false) ProposalStatus status,
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails){

       List<CompanyProposalListResponse> response  = proposalService.getCompanyProposalList(status, companyUserDetails.getCompanyId());

        return ApiUtils.success(response);
    }

    //여행사 제안서 상세내용 조회
    @GetMapping("/{proposalId}")
    public ApiUtils.ApiResponse<CompanyProposalDetailResponse> getCompanyProposalDetail(
            @PathVariable Integer proposalId,
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails){

        CompanyProposalDetailResponse response = proposalService.getCompanyProposalDetail(proposalId,companyUserDetails.getCompanyId());

        return ApiUtils.success(response);
    }

    @GetMapping("/{proposalId}/passports")
    public ApiUtils.ApiResponse<List<TravelerPassportResponse>> getTravelerPassportList(
            @PathVariable Integer proposalId) {

        List<TravelerPassportResponse> response = proposalService.getTravelerPassportList(proposalId);
        return ApiUtils.success(response);
    }

}
