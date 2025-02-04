package com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal;

import com.dancing_orangutan.ukkikki.proposal.domain.ProposalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaProposalRepository extends JpaRepository<ProposalEntity,Integer> {
}
