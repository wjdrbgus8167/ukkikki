package com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlan;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QTravelPlanEntity is a Querydsl query type for TravelPlanEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QTravelPlanEntity extends EntityPathBase<TravelPlanEntity> {

    private static final long serialVersionUID = -1150499438L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QTravelPlanEntity travelPlanEntity = new QTravelPlanEntity("travelPlanEntity");

    public final com.dancing_orangutan.ukkikki.entity.info.QCityEntity arrivalCity;

    public final DateTimePath<java.time.LocalDateTime> closeTime = createDateTime("closeTime", java.time.LocalDateTime.class);

    public final DateTimePath<java.time.LocalDateTime> createTime = createDateTime("createTime", java.time.LocalDateTime.class);

    public final com.dancing_orangutan.ukkikki.entity.info.QCityEntity departureCity;

    public final DatePath<java.time.LocalDate> endDate = createDate("endDate", java.time.LocalDate.class);

    public final StringPath hostComment = createString("hostComment");

    public final NumberPath<Integer> maxPeople = createNumber("maxPeople", Integer.class);

    public final SetPath<com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity> memberTravelPlans = this.<com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity>createSet("memberTravelPlans", com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.MemberTravelPlanEntity.class, com.dancing_orangutan.ukkikki.travelPlan.domain.memberTravel.QMemberTravelPlanEntity.class, PathInits.DIRECT2);

    public final SetPath<com.dancing_orangutan.ukkikki.travelPlan.domain.MessageEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.QMessageEntity> messages = this.<com.dancing_orangutan.ukkikki.travelPlan.domain.MessageEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.QMessageEntity>createSet("messages", com.dancing_orangutan.ukkikki.travelPlan.domain.MessageEntity.class, com.dancing_orangutan.ukkikki.travelPlan.domain.QMessageEntity.class, PathInits.DIRECT2);

    public final NumberPath<Integer> minPeople = createNumber("minPeople", Integer.class);

    public final StringPath name = createString("name");

    public final SetPath<com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity, com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity> places = this.<com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity, com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity>createSet("places", com.dancing_orangutan.ukkikki.place.domain.place.PlaceEntity.class, com.dancing_orangutan.ukkikki.place.domain.place.QPlaceEntity.class, PathInits.DIRECT2);

    public final EnumPath<com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus> planningStatus = createEnum("planningStatus", com.dancing_orangutan.ukkikki.travelPlan.constant.PlanningStatus.class);

    public final DatePath<java.time.LocalDate> startDate = createDate("startDate", java.time.LocalDate.class);

    public final NumberPath<Integer> travelPlanId = createNumber("travelPlanId", Integer.class);

    public final SetPath<com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.QTravelPlanKeywordEntity> travelPlanKeywords = this.<com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity, com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.QTravelPlanKeywordEntity>createSet("travelPlanKeywords", com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.TravelPlanKeywordEntity.class, com.dancing_orangutan.ukkikki.travelPlan.domain.travelPlanKeyword.QTravelPlanKeywordEntity.class, PathInits.DIRECT2);

    public QTravelPlanEntity(String variable) {
        this(TravelPlanEntity.class, forVariable(variable), INITS);
    }

    public QTravelPlanEntity(Path<? extends TravelPlanEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QTravelPlanEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QTravelPlanEntity(PathMetadata metadata, PathInits inits) {
        this(TravelPlanEntity.class, metadata, inits);
    }

    public QTravelPlanEntity(Class<? extends TravelPlanEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.arrivalCity = inits.isInitialized("arrivalCity") ? new com.dancing_orangutan.ukkikki.entity.info.QCityEntity(forProperty("arrivalCity"), inits.get("arrivalCity")) : null;
        this.departureCity = inits.isInitialized("departureCity") ? new com.dancing_orangutan.ukkikki.entity.info.QCityEntity(forProperty("departureCity"), inits.get("departureCity")) : null;
    }

}

