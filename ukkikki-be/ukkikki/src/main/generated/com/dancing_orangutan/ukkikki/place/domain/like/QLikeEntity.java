package com.dancing_orangutan.ukkikki.place.domain.like;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QLikeEntity is a Querydsl query type for LikeEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QLikeEntity extends EntityPathBase<LikeEntity> {

    private static final long serialVersionUID = 766114286L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QLikeEntity likeEntity = new QLikeEntity("likeEntity");

    public final DatePath<java.time.LocalDate> createdAt = createDate("createdAt", java.time.LocalDate.class);

    public final QLikeId likeId;

    public final NumberPath<Integer> likesCnt = createNumber("likesCnt", Integer.class);

    public final com.dancing_orangutan.ukkikki.member.domain.QMemberEntity member;

    public final com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity placeEntity;

    public QLikeEntity(String variable) {
        this(LikeEntity.class, forVariable(variable), INITS);
    }

    public QLikeEntity(Path<? extends LikeEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QLikeEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QLikeEntity(PathMetadata metadata, PathInits inits) {
        this(LikeEntity.class, metadata, inits);
    }

    public QLikeEntity(Class<? extends LikeEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.likeId = inits.isInitialized("likeId") ? new QLikeId(forProperty("likeId")) : null;
        this.member = inits.isInitialized("member") ? new com.dancing_orangutan.ukkikki.member.domain.QMemberEntity(forProperty("member")) : null;
        this.placeEntity = inits.isInitialized("placeEntity") ? new com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity(forProperty("placeEntity"), inits.get("placeEntity")) : null;
    }

}

