package com.dancing_orangutan.ukkikki.proposal.infrastructure.vote;

import com.dancing_orangutan.ukkikki.proposal.domain.vote.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaVoteRepository extends JpaRepository<VoteEntity,Integer> {

    boolean existsByVoteSurvey_VoteSurveyIdAndMember_MemberId(Integer voteSurveyId, Integer memberId);
}
