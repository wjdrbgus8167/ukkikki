package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface InquiryMapper {

    Inquiry entityToDomain(InquiryEntity entity);

    InquiryEntity domainToEntity(Inquiry inquiry);
}
