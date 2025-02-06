package com.dancing_orangutan.ukkikki.proposal.domain.cost;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QCostEntity is a Querydsl query type for CostEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCostEntity extends EntityPathBase<CostEntity> {

    private static final long serialVersionUID = 1768809251L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QCostEntity costEntity = new QCostEntity("costEntity");

    public final NumberPath<Integer> cost = createNumber("cost", Integer.class);

    public final NumberPath<Integer> costId = createNumber("costId", Integer.class);

    public final NumberPath<Integer> maxPeople = createNumber("maxPeople", Integer.class);

    public final NumberPath<Integer> minPeople = createNumber("minPeople", Integer.class);

    public final com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity proposal;

    public QCostEntity(String variable) {
        this(CostEntity.class, forVariable(variable), INITS);
    }

    public QCostEntity(Path<? extends CostEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QCostEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QCostEntity(PathMetadata metadata, PathInits inits) {
        this(CostEntity.class, metadata, inits);
    }

    public QCostEntity(Class<? extends CostEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.proposal = inits.isInitialized("proposal") ? new com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity(forProperty("proposal"), inits.get("proposal")) : null;
    }

}

