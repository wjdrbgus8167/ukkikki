package com.dancing_orangutan.ukkikki.place.domain.like;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QLikeId is a Querydsl query type for LikeId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QLikeId extends BeanPath<LikeId> {

    private static final long serialVersionUID = -922296154L;

    public static final QLikeId likeId = new QLikeId("likeId");

    public final NumberPath<Integer> memberId = createNumber("memberId", Integer.class);

    public final NumberPath<Integer> placeId = createNumber("placeId", Integer.class);

    public QLikeId(String variable) {
        super(LikeId.class, forVariable(variable));
    }

    public QLikeId(Path<? extends LikeId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QLikeId(PathMetadata metadata) {
        super(LikeId.class, metadata);
    }

}

