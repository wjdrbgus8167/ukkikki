package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QTravelPlanKeywordId is a Querydsl query type for TravelPlanKeywordId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QTravelPlanKeywordId extends BeanPath<TravelPlanKeywordId> {

    private static final long serialVersionUID = 786229146L;

    public static final QTravelPlanKeywordId travelPlanKeywordId = new QTravelPlanKeywordId("travelPlanKeywordId");

    public final NumberPath<Integer> keywordId = createNumber("keywordId", Integer.class);

    public final NumberPath<Integer> travelPlanId = createNumber("travelPlanId", Integer.class);

    public QTravelPlanKeywordId(String variable) {
        super(TravelPlanKeywordId.class, forVariable(variable));
    }

    public QTravelPlanKeywordId(Path<? extends TravelPlanKeywordId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QTravelPlanKeywordId(PathMetadata metadata) {
        super(TravelPlanKeywordId.class, metadata);
    }

}

