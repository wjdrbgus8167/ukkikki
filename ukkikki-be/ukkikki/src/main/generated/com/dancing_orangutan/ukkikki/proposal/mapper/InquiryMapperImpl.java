package com.dancing_orangutan.ukkikki.proposal.mapper;

import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.Inquiry;
import com.dancing_orangutan.ukkikki.proposal.domain.Inquiry.InquiryEntity;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-02-06T10:10:12+0900",
    comments = "version: 1.5.3.Final, compiler: IncrementalProcessingEnvironment from gradle-language-java-8.11.1.jar, environment: Java 17.0.13 (Eclipse Adoptium)"
)
@Component
public class InquiryMapperImpl implements InquiryMapper {

    @Override
    public Inquiry entityToDomain(InquiryEntity entity) {
        if ( entity == null ) {
            return null;
        }

        Inquiry.InquiryBuilder inquiry = Inquiry.builder();

        inquiry.inquiryId( entity.getInquiryId() );
        inquiry.title( entity.getTitle() );
        inquiry.content( entity.getContent() );
        inquiry.answer( entity.getAnswer() );
        inquiry.createTIme( entity.getCreateTIme() );
        inquiry.completedTIme( entity.getCompletedTIme() );

        return inquiry.build();
    }

    @Override
    public InquiryEntity domainToEntity(Inquiry inquiry) {
        if ( inquiry == null ) {
            return null;
        }

        InquiryEntity.InquiryEntityBuilder inquiryEntity = InquiryEntity.builder();

        inquiryEntity.inquiryId( inquiry.getInquiryId() );
        inquiryEntity.title( inquiry.getTitle() );
        inquiryEntity.content( inquiry.getContent() );
        inquiryEntity.answer( inquiry.getAnswer() );
        inquiryEntity.createTIme( inquiry.getCreateTIme() );
        inquiryEntity.completedTIme( inquiry.getCompletedTIme() );

        return inquiryEntity.build();
    }
}
