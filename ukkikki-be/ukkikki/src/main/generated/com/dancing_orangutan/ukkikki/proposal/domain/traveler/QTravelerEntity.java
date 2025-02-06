package com.dancing_orangutan.ukkikki.proposal.domain.traveler;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTravelerEntity is a Querydsl query type for TravelerEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTravelerEntity extends EntityPathBase<TravelerEntity> {

    private static final long serialVersionUID = 1080742371L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTravelerEntity travelerEntity = new QTravelerEntity("travelerEntity");

    public final DatePath<java.time.LocalDate> birthDate = createDate("birthDate", java.time.LocalDate.class);

    public final StringPath englishName = createString("englishName");

    public final DatePath<java.time.LocalDate> expirationDate = createDate("expirationDate", java.time.LocalDate.class);

    public final StringPath koreanName = createString("koreanName");

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity memberTravelPlan;

    public final StringPath passportNumber = createString("passportNumber");

    public final StringPath phoneNumber = createString("phoneNumber");

    public final com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity proposal;

    public final NumberPath<Integer> travelerId = createNumber("travelerId", Integer.class);

    public QTravelerEntity(String variable) {
        this(TravelerEntity.class, forVariable(variable), INITS);
    }

    public QTravelerEntity(Path<? extends TravelerEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTravelerEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTravelerEntity(PathMetadata metadata, PathInits inits) {
        this(TravelerEntity.class, metadata, inits);
    }

    public QTravelerEntity(Class<? extends TravelerEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberTravelPlan = inits.isInitialized("memberTravelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity(forProperty("memberTravelPlan"), inits.get("memberTravelPlan")) : null;
        this.proposal = inits.isInitialized("proposal") ? new com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity(forProperty("proposal"), inits.get("proposal")) : null;
    }

}

