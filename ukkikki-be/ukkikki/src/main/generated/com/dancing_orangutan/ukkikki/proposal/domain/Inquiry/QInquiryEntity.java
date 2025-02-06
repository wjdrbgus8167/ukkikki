package com.dancing_orangutan.ukkikki.proposal.domain.Inquiry;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QInquiryEntity is a Querydsl query type for InquiryEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QInquiryEntity extends EntityPathBase<InquiryEntity> {

    private static final long serialVersionUID = 1831218965L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QInquiryEntity inquiryEntity = new QInquiryEntity("inquiryEntity");

    public final StringPath answer = createString("answer");

    public final DateTimePath<java.time.LocalDateTime> completedTIme = createDateTime("completedTIme", java.time.LocalDateTime.class);

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.LocalDateTime> createTIme = createDateTime("createTIme", java.time.LocalDateTime.class);

    public final NumberPath<Integer> inquiryId = createNumber("inquiryId", Integer.class);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity memberTravelPlan;

    public final com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity proposal;

    public final StringPath title = createString("title");

    public QInquiryEntity(String variable) {
        this(InquiryEntity.class, forVariable(variable), INITS);
    }

    public QInquiryEntity(Path<? extends InquiryEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QInquiryEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QInquiryEntity(PathMetadata metadata, PathInits inits) {
        this(InquiryEntity.class, metadata, inits);
    }

    public QInquiryEntity(Class<? extends InquiryEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberTravelPlan = inits.isInitialized("memberTravelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity(forProperty("memberTravelPlan"), inits.get("memberTravelPlan")) : null;
        this.proposal = inits.isInitialized("proposal") ? new com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity(forProperty("proposal"), inits.get("proposal")) : null;
    }

}

