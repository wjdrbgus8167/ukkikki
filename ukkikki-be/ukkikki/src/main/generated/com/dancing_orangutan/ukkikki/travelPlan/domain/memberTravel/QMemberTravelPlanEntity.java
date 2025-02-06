package com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberTravelPlanEntity is a Querydsl query type for MemberTravelPlanEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberTravelPlanEntity extends EntityPathBase<MemberTravelPlanEntity> {

    private static final long serialVersionUID = -975514885L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberTravelPlanEntity memberTravelPlanEntity = new QMemberTravelPlanEntity("memberTravelPlanEntity");

    public final NumberPath<Integer> adultCount = createNumber("adultCount", Integer.class);

    public final NumberPath<Integer> childCount = createNumber("childCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> exitTime = createDateTime("exitTime", java.time.LocalDateTime.class);

    public final BooleanPath exitYn = createBoolean("exitYn");

    public final DateTimePath<java.time.LocalDateTime> firstJoinTime = createDateTime("firstJoinTime", java.time.LocalDateTime.class);

    public final BooleanPath hostYn = createBoolean("hostYn");

    public final NumberPath<Integer> infantCount = createNumber("infantCount", Integer.class);

    public final DateTimePath<java.time.LocalDateTime> lastJoinTime = createDateTime("lastJoinTime", java.time.LocalDateTime.class);

    public final com.dancing_orangutan.ukkikki.member.domain.QMemberEntity member;

    public final QMemberTravelPlanId memberTravelPlanId;

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public QMemberTravelPlanEntity(String variable) {
        this(MemberTravelPlanEntity.class, forVariable(variable), INITS);
    }

    public QMemberTravelPlanEntity(Path<? extends MemberTravelPlanEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberTravelPlanEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberTravelPlanEntity(PathMetadata metadata, PathInits inits) {
        this(MemberTravelPlanEntity.class, metadata, inits);
    }

    public QMemberTravelPlanEntity(Class<? extends MemberTravelPlanEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.dancing_orangutan.ukkikki.member.domain.QMemberEntity(forProperty("member")) : null;
        this.memberTravelPlanId = inits.isInitialized("memberTravelPlanId") ? new QMemberTravelPlanId(forProperty("memberTravelPlanId")) : null;
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
    }

}

