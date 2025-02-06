package com.dancing_orangutan.ukkikki.member.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberEntity is a Querydsl query type for MemberEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberEntity extends EntityPathBase<MemberEntity> {

    private static final long serialVersionUID = -1892631565L;

    public static final QMemberEntity memberEntity = new QMemberEntity("memberEntity");

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> deleteTime = createDateTime("deleteTime", java.time.LocalDateTime.class);

    public final StringPath email = createString("email");

    public final NumberPath<Integer> memberId = createNumber("memberId", Integer.class);

    public final ListPath<com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity> memberTravelPlans = this.<com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity>createList("memberTravelPlans", com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity.class, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity.class, PathInits.DIRECT2);

    public final StringPath name = createString("name");

    public final StringPath password = createString("password");

    public final StringPath profileImageUrl = createString("profileImageUrl");

    public final StringPath provider = createString("provider");

    public QMemberEntity(String variable) {
        super(MemberEntity.class, forVariable(variable));
    }

    public QMemberEntity(Path<? extends MemberEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMemberEntity(PathMetadata metadata) {
        super(MemberEntity.class, metadata);
    }

}

