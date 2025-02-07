package com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule;

import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalFinder;
import lombok.RequiredArgsConstructor;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class ScheduleRepository {

    private final JpaScheduleRepository jpaScheduleRepository;
    private final ProposalFinder proposalFinder;

    public Schedule save(final Schedule schedule){

        ScheduleEntity scheduleEntity = ScheduleEntity.builder()
                .scheduleName(schedule.getScheduleName())
                .startTime(schedule.getStartTime())
                .endTime(schedule.getEndTime())
                .imageUrl(schedule.getImageUrl())
                .proposal(proposalFinder.findByProposalId(schedule.getProposalId()))
                .build();

        ScheduleEntity savedScheduleEntity = jpaScheduleRepository.save(scheduleEntity);

        return Schedule.builder()
                .scheduleName(savedScheduleEntity.getScheduleName())
                .startTime(savedScheduleEntity.getStartTime())
                .endTime(savedScheduleEntity.getEndTime())
                .imageUrl(savedScheduleEntity.getImageUrl())
                .proposalId(savedScheduleEntity.getProposal().getProposalId())
                .build();
    }

    public List<ScheduleEntity> checkOverlapSchedule(Integer proposalId, LocalDateTime startTime, LocalDateTime endTime){

        return jpaScheduleRepository.findByProposal_ProposalIdAndStartTimeLessThanAndEndTimeGreaterThan(proposalId,endTime,startTime);
    }
}
