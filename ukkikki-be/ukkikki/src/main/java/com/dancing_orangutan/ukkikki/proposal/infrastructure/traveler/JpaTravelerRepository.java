package com.dancing_orangutan.ukkikki.proposal.infrastructure.traveler;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.Proposal;
import com.dancing_orangutan.ukkikki.proposal.domain.traveler.TravelerEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaTravelerRepository extends JpaRepository<TravelerEntity, Integer> {
    List<TravelerEntity> findByProposal_ProposalId(Integer proposalId);
}
