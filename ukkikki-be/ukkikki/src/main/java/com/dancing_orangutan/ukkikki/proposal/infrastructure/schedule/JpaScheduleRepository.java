package com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule;

import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JpaScheduleRepository extends JpaRepository<ScheduleEntity,Integer> {

    List<ScheduleEntity> findByProposal_ProposalId(Integer proposalId);
}
