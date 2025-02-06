package com.dancing_orangutan.ukkikki.place.domain.placeTag;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlaceTagEntity is a Querydsl query type for PlaceTagEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlaceTagEntity extends EntityPathBase<PlaceTagEntity> {

    private static final long serialVersionUID = 1887794414L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlaceTagEntity placeTagEntity = new QPlaceTagEntity("placeTagEntity");

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity memberTravelPlan;

    public final com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity placeEntity;

    public final NumberPath<Integer> placeTagId = createNumber("placeTagId", Integer.class);

    public final StringPath placeTagName = createString("placeTagName");

    public QPlaceTagEntity(String variable) {
        this(PlaceTagEntity.class, forVariable(variable), INITS);
    }

    public QPlaceTagEntity(Path<? extends PlaceTagEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlaceTagEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlaceTagEntity(PathMetadata metadata, PathInits inits) {
        this(PlaceTagEntity.class, metadata, inits);
    }

    public QPlaceTagEntity(Class<? extends PlaceTagEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberTravelPlan = inits.isInitialized("memberTravelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity(forProperty("memberTravelPlan"), inits.get("memberTravelPlan")) : null;
        this.placeEntity = inits.isInitialized("placeEntity") ? new com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity(forProperty("placeEntity"), inits.get("placeEntity")) : null;
    }

}

