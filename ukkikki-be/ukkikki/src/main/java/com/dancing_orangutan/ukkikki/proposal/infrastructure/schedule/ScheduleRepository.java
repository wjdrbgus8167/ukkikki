package com.dancing_orangutan.ukkikki.proposal.infrastructure.schedule;

import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import com.dancing_orangutan.ukkikki.proposal.infrastructure.proposal.ProposalFinder;
import com.dancing_orangutan.ukkikki.proposal.mapper.ScheduleMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Repository
@Slf4j
public class ScheduleRepository {

    private final JpaScheduleRepository jpaScheduleRepository;
    private final ProposalFinder proposalFinder;
    private final ScheduleMapper scheduleMapper;

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

    // 여행일정 전체 저장
    public List<Schedule> saveAll(List<Schedule> schedules) {

        List<ScheduleEntity> scheduleEntities = schedules.stream()
                .map(scheduleMapper::domainToEntity) // Schedule → ScheduleEntity 변환
                .collect(Collectors.toList());

        List<ScheduleEntity> savedEntities = jpaScheduleRepository.saveAll(scheduleEntities);

        return savedEntities.stream()
                .map(scheduleMapper::entityToDomain) // ScheduleEntity → Schedule 변환
                .collect(Collectors.toList());

    }

}
