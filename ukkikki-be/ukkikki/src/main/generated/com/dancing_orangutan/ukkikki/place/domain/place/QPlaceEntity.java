package com.dancing_orangutan.ukkikki.place.domain.place;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QPlaceEntity is a Querydsl query type for PlaceEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QPlaceEntity extends EntityPathBase<PlaceEntity> {

    private static final long serialVersionUID = 2092401344L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QPlaceEntity placeEntity = new QPlaceEntity("placeEntity");

    public final StringPath address = createString("address");

    public final NumberPath<Double> latitude = createNumber("latitude", Double.class);

    public final ListPath<com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity, com.dancing_orangutan.ukkikki.place.domain.like.QLikeEntity> likes = this.<com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity, com.dancing_orangutan.ukkikki.place.domain.like.QLikeEntity>createList("likes", com.dancing_orangutan.ukkikki.place.domain.like.LikeEntity.class, com.dancing_orangutan.ukkikki.place.domain.like.QLikeEntity.class, PathInits.DIRECT2);

    public final NumberPath<Double> longitude = createNumber("longitude", Double.class);

    public final StringPath name = createString("name");

    public final NumberPath<Integer> placeId = createNumber("placeId", Integer.class);

    public final ListPath<com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity, com.dancing_orangutan.ukkikki.place.domain.placeTag.QPlaceTagEntity> placeTags = this.<com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity, com.dancing_orangutan.ukkikki.place.domain.placeTag.QPlaceTagEntity>createList("placeTags", com.dancing_orangutan.ukkikki.place.domain.placeTag.PlaceTagEntity.class, com.dancing_orangutan.ukkikki.place.domain.placeTag.QPlaceTagEntity.class, PathInits.DIRECT2);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public QPlaceEntity(String variable) {
        this(PlaceEntity.class, forVariable(variable), INITS);
    }

    public QPlaceEntity(Path<? extends PlaceEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QPlaceEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QPlaceEntity(PathMetadata metadata, PathInits inits) {
        this(PlaceEntity.class, metadata, inits);
    }

    public QPlaceEntity(Class<? extends PlaceEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
    }

}

