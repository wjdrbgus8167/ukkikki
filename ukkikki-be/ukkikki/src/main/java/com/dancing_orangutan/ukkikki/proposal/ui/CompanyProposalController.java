package com.dancing_orangutan.ukkikki.proposal.ui;

import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.ui.response.CompanyProposalListResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            @AuthenticationPrincipal CompanyUserDetails companyUserDetails){

       List<CompanyProposalListResponse> response  = proposalService.getCompanyProposalList(companyUserDetails.getCompanyId());

        return ApiUtils.success(response);
    }
}
