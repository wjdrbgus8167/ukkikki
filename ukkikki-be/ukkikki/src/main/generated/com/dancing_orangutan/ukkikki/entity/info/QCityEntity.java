package com.dancing_orangutan.ukkikki.entity.info;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCityEntity is a Querydsl query type for CityEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCityEntity extends EntityPathBase<CityEntity> {

    private static final long serialVersionUID = 1624968099L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCityEntity cityEntity = new QCityEntity("cityEntity");

    public final NumberPath<Integer> cityId = createNumber("cityId", Integer.class);

    public final StringPath cityName = createString("cityName");

    public final QCountry country;

    public QCityEntity(String variable) {
        this(CityEntity.class, forVariable(variable), INITS);
    }

    public QCityEntity(Path<? extends CityEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCityEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCityEntity(PathMetadata metadata, PathInits inits) {
        this(CityEntity.class, metadata, inits);
    }

    public QCityEntity(Class<? extends CityEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.country = inits.isInitialized("country") ? new QCountry(forProperty("country"), inits.get("country")) : null;
    }

}

