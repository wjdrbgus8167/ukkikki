package com.dancing_orangutan.ukkikki.proposal.infrastructure.session;

import com.dancing_orangutan.ukkikki.proposal.domain.session.SessionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SessionRepository extends JpaRepository<SessionEntity, Integer> {

   Optional<SessionEntity> findByProposalId(Integer proposalId);
}
