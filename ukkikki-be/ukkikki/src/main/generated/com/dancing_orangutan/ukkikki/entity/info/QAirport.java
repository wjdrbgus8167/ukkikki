package com.dancing_orangutan.ukkikki.entity.info;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAirport is a Querydsl query type for Airport
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAirport extends EntityPathBase<Airport> {

    private static final long serialVersionUID = 1248811638L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QAirport airport = new QAirport("airport");

    public final StringPath airportCode = createString("airportCode");

    public final StringPath airportName = createString("airportName");

    public final QCityEntity city;

    public QAirport(String variable) {
        this(Airport.class, forVariable(variable), INITS);
    }

    public QAirport(Path<? extends Airport> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QAirport(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QAirport(PathMetadata metadata, PathInits inits) {
        this(Airport.class, metadata, inits);
    }

    public QAirport(Class<? extends Airport> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.city = inits.isInitialized("city") ? new QCityEntity(forProperty("city"), inits.get("city")) : null;
    }

}

