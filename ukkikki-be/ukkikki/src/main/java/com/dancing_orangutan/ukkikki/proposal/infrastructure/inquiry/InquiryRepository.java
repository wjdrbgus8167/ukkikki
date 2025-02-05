package com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import com.dancing_orangutan.ukkikki.proposal.mapper.InquiryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
public class InquiryRepository {

    private final JpaInquiryRepository jpaInquiryRepository;
    private final InquiryMapper inquiryMapper;

    public Inquiry save(Inquiry inquiry) {

        InquiryEntity entity = inquiryMapper.domainToEntity(inquiry);

        return inquiryMapper.entityToDomain(jpaInquiryRepository.save(entity));
    }
}
