package com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JpaInquiryRepository extends JpaRepository<InquiryEntity, Integer> {
}
