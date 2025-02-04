package com.dancing_orangutan.ukkikki.proposal.ui;


import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.proposal.application.ProposalService;
import com.dancing_orangutan.ukkikki.proposal.application.command.CreateProposalCommand;
import com.dancing_orangutan.ukkikki.proposal.domain.Proposal;
import com.dancing_orangutan.ukkikki.proposal.ui.request.CreateProposalRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/travel-plans/{travelPlanId}/proposals")
public class ProposalController {


    private final ProposalService proposalService;

    // 제안서 작성
    @PostMapping
    public ApiUtils.ApiResponse<Proposal> createProposal(
            @PathVariable Integer travelPlanId,
            @RequestParam Integer companyId,
            @Validated @RequestBody CreateProposalRequest request){
        if (request == null || request.getProposalRequest() == null) {
            throw new IllegalArgumentException("Request body or proposalRequest is missing!");
        }
        CreateProposalCommand command = request.toCommand(travelPlanId, companyId);
        return ApiUtils.success(proposalService.createProposal(command));
    }


}
