package com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoteSurveyEntity is a Querydsl query type for VoteSurveyEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoteSurveyEntity extends EntityPathBase<VoteSurveyEntity> {

    private static final long serialVersionUID = 968523523L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoteSurveyEntity voteSurveyEntity = new QVoteSurveyEntity("voteSurveyEntity");

    public final DateTimePath<java.time.LocalDateTime> surveyEndTime = createDateTime("surveyEndTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> surveyStartTime = createDateTime("surveyStartTime", java.time.LocalDateTime.class);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public final NumberPath<Integer> voteSurveyId = createNumber("voteSurveyId", Integer.class);

    public QVoteSurveyEntity(String variable) {
        this(VoteSurveyEntity.class, forVariable(variable), INITS);
    }

    public QVoteSurveyEntity(Path<? extends VoteSurveyEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoteSurveyEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoteSurveyEntity(PathMetadata metadata, PathInits inits) {
        this(VoteSurveyEntity.class, metadata, inits);
    }

    public QVoteSurveyEntity(Class<? extends VoteSurveyEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
    }

}

