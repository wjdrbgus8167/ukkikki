package com.dancing_orangutan.ukkikki.proposal.ui;


import com.dancing_orangutan.ukkikki.global.response.ApiUtils;
import com.dancing_orangutan.ukkikki.global.security.CompanyUserDetails;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateProposalRequest;
import com.dancing_orangutan.ukkikki.proposal.ui.response.ProposalDetailResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
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

}
