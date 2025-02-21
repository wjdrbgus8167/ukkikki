package com.dancing_orangutan.ukkikki.proposal.mapper;


import com.dancing_orangutan.ukkikki.proposal.domain.proposal.ProposalEntity;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.Schedule;
import com.dancing_orangutan.ukkikki.proposal.domain.schedule.ScheduleEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

@Mapper(componentModel = "spring")
public interface ScheduleMapper {

    @Mapping(target = "proposalId", source = "proposal" , qualifiedByName = "proposalToId")
    Schedule entityToDomain(ScheduleEntity entity);

   @Mapping(target = "proposal.proposalId", source = "proposalId")
    ScheduleEntity domainToEntity(Schedule domain);

    @Named("proposalToId")
    static Integer proposalToId(ProposalEntity proposal) {
        return proposal !=null ? proposal.getProposalId() :null;
    }
}
