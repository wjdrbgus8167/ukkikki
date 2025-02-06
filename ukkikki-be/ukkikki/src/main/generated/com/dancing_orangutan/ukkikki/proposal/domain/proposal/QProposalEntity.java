package com.dancing_orangutan.ukkikki.proposal.domain.proposal;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QProposalEntity is a Querydsl query type for ProposalEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProposalEntity extends EntityPathBase<ProposalEntity> {

    private static final long serialVersionUID = 1501575747L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QProposalEntity proposalEntity = new QProposalEntity("proposalEntity");

    public final StringPath airline = createString("airline");

    public final com.dancing_orangutan.ukkikki.entity.info.QAirport arrivalAirport;

    public final com.dancing_orangutan.ukkikki.member.domain.QCompanyEntity company;

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.dancing_orangutan.ukkikki.entity.info.QAirport departureAirport;

    public final NumberPath<Integer> deposit = createNumber("deposit", Integer.class);

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final DateTimePath<java.time.LocalDateTime> endDateArrivalTime = createDateTime("endDateArrivalTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> endDateBoardingTime = createDateTime("endDateBoardingTime", java.time.LocalDateTime.class);

    public final BooleanPath guideIncluded = createBoolean("guideIncluded");

    public final BooleanPath insuranceIncluded = createBoolean("insuranceIncluded");

    public final NumberPath<Integer> minPeople = createNumber("minPeople", Integer.class);

    public final StringPath productIntroduction = createString("productIntroduction");

    public final NumberPath<Integer> proposalId = createNumber("proposalId", Integer.class);

    public final EnumPath<com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus> proposalStatus = createEnum("proposalStatus", com.dancing_orangutan.ukkikki.proposal.constant.ProposalStatus.class);

    public final StringPath refundPolicy = createString("refundPolicy");

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final DateTimePath<java.time.LocalDateTime> startDateArrivalTime = createDateTime("startDateArrivalTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> startDateBoardingTime = createDateTime("startDateBoardingTime", java.time.LocalDateTime.class);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public final DateTimePath<java.time.LocalDateTime> updateTime = createDateTime("updateTime", java.time.LocalDateTime.class);

    public QProposalEntity(String variable) {
        this(ProposalEntity.class, forVariable(variable), INITS);
    }

    public QProposalEntity(Path<? extends ProposalEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QProposalEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QProposalEntity(PathMetadata metadata, PathInits inits) {
        this(ProposalEntity.class, metadata, inits);
    }

    public QProposalEntity(Class<? extends ProposalEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.arrivalAirport = inits.isInitialized("arrivalAirport") ? new com.dancing_orangutan.ukkikki.entity.info.QAirport(forProperty("arrivalAirport"), inits.get("arrivalAirport")) : null;
        this.company = inits.isInitialized("company") ? new com.dancing_orangutan.ukkikki.member.domain.QCompanyEntity(forProperty("company")) : null;
        this.departureAirport = inits.isInitialized("departureAirport") ? new com.dancing_orangutan.ukkikki.entity.info.QAirport(forProperty("departureAirport"), inits.get("departureAirport")) : null;
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
    }

}

