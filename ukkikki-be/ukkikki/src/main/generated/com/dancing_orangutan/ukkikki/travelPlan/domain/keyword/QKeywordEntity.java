package com.dancing_orangutan.ukkikki.travelPlan.domain.keyword;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QKeywordEntity is a Querydsl query type for KeywordEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QKeywordEntity extends EntityPathBase<KeywordEntity> {

    private static final long serialVersionUID = 1371035048L;

    public static final QKeywordEntity keywordEntity = new QKeywordEntity("keywordEntity");

    public final NumberPath<Integer> keywordId = createNumber("keywordId", Integer.class);

    public final StringPath name = createString("name");

    public QKeywordEntity(String variable) {
        super(KeywordEntity.class, forVariable(variable));
    }

    public QKeywordEntity(Path<? extends KeywordEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QKeywordEntity(PathMetadata metadata) {
        super(KeywordEntity.class, metadata);
    }

}

