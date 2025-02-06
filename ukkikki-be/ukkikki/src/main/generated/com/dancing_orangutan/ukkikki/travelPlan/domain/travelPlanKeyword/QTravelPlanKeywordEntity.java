package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTravelPlanKeywordEntity is a Querydsl query type for TravelPlanKeywordEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTravelPlanKeywordEntity extends EntityPathBase<TravelPlanKeywordEntity> {

    private static final long serialVersionUID = 444294882L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTravelPlanKeywordEntity travelPlanKeywordEntity = new QTravelPlanKeywordEntity("travelPlanKeywordEntity");

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.QKeywordEntity keyword;

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public final QTravelPlanKeywordId travelPlanKeywordId;

    public QTravelPlanKeywordEntity(String variable) {
        this(TravelPlanKeywordEntity.class, forVariable(variable), INITS);
    }

    public QTravelPlanKeywordEntity(Path<? extends TravelPlanKeywordEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTravelPlanKeywordEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTravelPlanKeywordEntity(PathMetadata metadata, PathInits inits) {
        this(TravelPlanKeywordEntity.class, metadata, inits);
    }

    public QTravelPlanKeywordEntity(Class<? extends TravelPlanKeywordEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.keyword = inits.isInitialized("keyword") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.keyword.QKeywordEntity(forProperty("keyword")) : null;
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
        this.travelPlanKeywordId = inits.isInitialized("travelPlanKeywordId") ? new QTravelPlanKeywordId(forProperty("travelPlanKeywordId")) : null;
    }

}

