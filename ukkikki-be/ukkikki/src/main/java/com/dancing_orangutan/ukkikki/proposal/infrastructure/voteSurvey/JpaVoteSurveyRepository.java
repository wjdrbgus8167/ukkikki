package com.dancing_orangutan.ukkikki.proposal.infrastructure.voteSurvey;

import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurvey;
import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaVoteSurveyRepository extends JpaRepository<VoteSurveyEntity, Integer> {
}
