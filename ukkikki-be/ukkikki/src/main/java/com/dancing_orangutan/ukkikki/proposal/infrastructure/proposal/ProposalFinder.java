package com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.proposal.mapper.ProposalMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProposalFinder {

    private final ProposalRepository proposalRepository;
    private final JpaProposalRepository jpaProposalRepository;

    public Proposal getProposalDomain(Integer proposalId) {

        return proposalRepository.findById(proposalId);
    }

    public ProposalEntity findByProposalId(Integer proposalId) {
        return jpaProposalRepository.findByProposalId(proposalId);
    }
}
