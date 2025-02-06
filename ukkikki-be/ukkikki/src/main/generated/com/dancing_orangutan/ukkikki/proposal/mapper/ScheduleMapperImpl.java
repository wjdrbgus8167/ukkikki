package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-06T10:10:12+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class ScheduleMapperImpl implements ScheduleMapper {

    @Override
    public Schedule entityToDomain(ScheduleEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Schedule.ScheduleBuilder schedule = Schedule.builder();

        schedule.proposalId( ScheduleMapper.proposalToId( entity.getProposal() ) );
        schedule.scheduleId( entity.getScheduleId() );
        schedule.scheduleName( entity.getScheduleName() );
        schedule.startTime( entity.getStartTime() );
        schedule.endTime( entity.getEndTime() );
        schedule.imageUrl( entity.getImageUrl() );

        return schedule.build();
    }

    @Override
    public ScheduleEntity domainToEntity(Schedule domain) {
        if ( domain == null ) {
            return null;
        }

        ScheduleEntity.ScheduleEntityBuilder scheduleEntity = ScheduleEntity.builder();

        scheduleEntity.scheduleId( domain.getScheduleId() );
        scheduleEntity.scheduleName( domain.getScheduleName() );
        scheduleEntity.startTime( domain.getStartTime() );
        scheduleEntity.endTime( domain.getEndTime() );
        scheduleEntity.imageUrl( domain.getImageUrl() );

        return scheduleEntity.build();
    }
}
