package com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class InquiryFinder {

    private final JpaInquiryRepository jpainquiryRepository;

    public List<InquiryEntity> findByProposalId(Integer proposalId) {

        return jpainquiryRepository.findByProposal_ProposalId(proposalId);
    }
}
