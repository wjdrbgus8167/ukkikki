package com.dancing_orangutan.ukkikki.proposal.infrastructure.vote;

import com.dancing_orangutan.ukkikki.proposal.domain.vote.VoteEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaVoteRepository extends JpaRepository<VoteEntity,Integer> {

    boolean existsByVoteSurvey_VoteSurveyIdAndMember_MemberId(Integer voteSurveyId, Integer memberId);

    Optional<List<VoteEntity>> findByProposal_ProposalId(Integer proposalId);
}
