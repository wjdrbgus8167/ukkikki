package com.dancing_orangutan.ukkikki.proposal.infrastructure.voteSurvey;

import com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.VoteSurveyEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaVoteSurveyRepository extends JpaRepository<VoteSurveyEntity, Integer>{

	boolean existsByTravelPlan_TravelPlanId(Integer travelPlanId);

	VoteSurveyEntity findByTravelPlan_TravelPlanId(Integer travelPlanId);

}
