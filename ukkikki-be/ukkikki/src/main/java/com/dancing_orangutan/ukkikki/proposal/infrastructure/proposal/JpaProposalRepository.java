package com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal;

import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaProposalRepository extends JpaRepository<ProposalEntity,Integer> {

    Optional<ProposalEntity> findById(Integer proposalId);

    List<ProposalEntity> findByCompany_CompanyId(Integer companyId);

    Optional<ProposalEntity> findByProposalIdAndCompany_CompanyId(Integer proposalId, Integer companyId);

    ProposalEntity findByProposalId(Integer proposalId);
}
