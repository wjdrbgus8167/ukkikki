package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QMemberTravelPlanId is a Querydsl query type for MemberTravelPlanId
 */
@Generated("com.querydsl.codegen.DefaultEmbeddableSerializer")
public class QMemberTravelPlanId extends BeanPath<MemberTravelPlanId> {

    private static final long serialVersionUID = 310396979L;

    public static final QMemberTravelPlanId memberTravelPlanId = new QMemberTravelPlanId("memberTravelPlanId");

    public final NumberPath<Integer> memberId = createNumber("memberId", Integer.class);

    public final NumberPath<Integer> travelPlanId = createNumber("travelPlanId", Integer.class);

    public QMemberTravelPlanId(String variable) {
        super(MemberTravelPlanId.class, forVariable(variable));
    }

    public QMemberTravelPlanId(Path<? extends MemberTravelPlanId> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberTravelPlanId(PathMetadata metadata) {
        super(MemberTravelPlanId.class, metadata);
    }

}

