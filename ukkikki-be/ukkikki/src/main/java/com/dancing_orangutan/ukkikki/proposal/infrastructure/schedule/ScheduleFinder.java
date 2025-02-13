package com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule;

import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ScheduleFinder {

    private final JpaScheduleRepository jpaScheduleRepository;

    public List<ScheduleEntity> findSchedulesByProposalId(Integer proposalId) {

        List<ScheduleEntity> schedules = jpaScheduleRepository.findByProposal_ProposalId(proposalId);

        if(schedules == null) {
            return Collections.emptyList();
        }else {
            schedules.sort(Comparator.comparing(ScheduleEntity::getStartTime));
            return schedules;
        }
    }
}
