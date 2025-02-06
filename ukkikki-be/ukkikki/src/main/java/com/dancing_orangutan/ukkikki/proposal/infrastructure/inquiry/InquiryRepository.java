package com.dancing_orangutan.ukkikki.proposal.infrastructure.inquiry;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import com.dancing_orangutan.ukkikki.proposal.mapper.InquiryMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

@RequiredArgsConstructor
@Repository
@Slf4j
public class InquiryRepository {

    private final JpaInquiryRepository jpaInquiryRepository;
    private final InquiryMapper inquiryMapper;

    public Inquiry save(Inquiry inquiry) {

        InquiryEntity entity = inquiryMapper.domainToEntity(inquiry);

        if (entity.getMemberTravelPlan() == null) {
            throw new IllegalStateException("MemberTravelPlan is null after mapping.");
        }

        InquiryEntity inquiryEntity = jpaInquiryRepository.save(entity);

        return inquiryMapper.entityToDomain(inquiryEntity);
    }
}
