package com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JpaInquiryRepository extends JpaRepository<InquiryEntity, Integer> {

    List<InquiryEntity> findByProposal_ProposalId(Integer proposalId);

    Optional<InquiryEntity> findByInquiryIdAndProposal_ProposalId(Integer inquiryId, Integer proposalId);
}
