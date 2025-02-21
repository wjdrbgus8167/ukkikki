package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurvey;
import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VoteSurveyMapper {

    VoteSurveyEntity domainToEntity(VoteSurvey voteSurvey);
    VoteSurvey entityToDomain(VoteSurveyEntity voteSurveyEntity);
}
