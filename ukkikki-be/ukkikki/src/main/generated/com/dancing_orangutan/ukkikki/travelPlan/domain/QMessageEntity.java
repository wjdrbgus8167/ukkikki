package com.dancing_orangutan.ukkikki.travelPlan.domain;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMessageEntity is a Querydsl query type for MessageEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMessageEntity extends EntityPathBase<MessageEntity> {

    private static final long serialVersionUID = 2035535243L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMessageEntity messageEntity = new QMessageEntity("messageEntity");

    public final StringPath content = createString("content");

    public final DatePath<java.time.LocalDate> createdAt = createDate("createdAt", java.time.LocalDate.class);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity memberTravelPlan;

    public final NumberPath<Integer> messageId = createNumber("messageId", Integer.class);

    public final com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity travelPlan;

    public QMessageEntity(String variable) {
        this(MessageEntity.class, forVariable(variable), INITS);
    }

    public QMessageEntity(Path<? extends MessageEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMessageEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMessageEntity(PathMetadata metadata, PathInits inits) {
        this(MessageEntity.class, metadata, inits);
    }

    public QMessageEntity(Class<? extends MessageEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.memberTravelPlan = inits.isInitialized("memberTravelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity(forProperty("memberTravelPlan"), inits.get("memberTravelPlan")) : null;
        this.travelPlan = inits.isInitialized("travelPlan") ? new com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan.QTravelPlanEntity(forProperty("travelPlan"), inits.get("travelPlan")) : null;
    }

}

