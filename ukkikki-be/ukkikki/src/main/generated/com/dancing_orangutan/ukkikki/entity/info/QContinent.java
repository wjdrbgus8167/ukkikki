package com.dancing_orangutan.ukkikki.entity.info;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QContinent is a Querydsl query type for Continent
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QContinent extends EntityPathBase<Continent> {

    private static final long serialVersionUID = 917925023L;

    public static final QContinent continent = new QContinent("continent");

    public final NumberPath<Integer> continentId = createNumber("continentId", Integer.class);

    public final StringPath continentName = createString("continentName");

    public QContinent(String variable) {
        super(Continent.class, forVariable(variable));
    }

    public QContinent(Path<? extends Continent> path) {
        super(path.getType(), path.getMetadata());
    }

    public QContinent(PathMetadata metadata) {
        super(Continent.class, metadata);
    }

}

