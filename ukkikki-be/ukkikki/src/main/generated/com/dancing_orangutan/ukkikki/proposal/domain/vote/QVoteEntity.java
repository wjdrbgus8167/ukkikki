package com.dancing_orangutan.ukkikki.proposal.domain.vote;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QVoteEntity is a Querydsl query type for VoteEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QVoteEntity extends EntityPathBase<VoteEntity> {

    private static final long serialVersionUID = -5753533L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QVoteEntity voteEntity = new QVoteEntity("voteEntity");

    public final com.dancing_orangutan.ukkikki.member.domain.QMemberEntity member;

    public final com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity proposal;

    public final NumberPath<Integer> voteId = createNumber("voteId", Integer.class);

    public final com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.QVoteSurveyEntity voteSurvey;

    public final DateTimePath<java.time.LocalDateTime> voteTime = createDateTime("voteTime", java.time.LocalDateTime.class);

    public QVoteEntity(String variable) {
        this(VoteEntity.class, forVariable(variable), INITS);
    }

    public QVoteEntity(Path<? extends VoteEntity> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QVoteEntity(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QVoteEntity(PathMetadata metadata, PathInits inits) {
        this(VoteEntity.class, metadata, inits);
    }

    public QVoteEntity(Class<? extends VoteEntity> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.dancing_orangutan.ukkikki.member.domain.QMemberEntity(forProperty("member")) : null;
        this.proposal = inits.isInitialized("proposal") ? new com.dancing_orangutan.ukkikki.proposal.domain.proposal.QProposalEntity(forProperty("proposal"), inits.get("proposal")) : null;
        this.voteSurvey = inits.isInitialized("voteSurvey") ? new com.dancing_orangutan.ukkikki.proposal.domain.voteSurvey.QVoteSurveyEntity(forProperty("voteSurvey"), inits.get("voteSurvey")) : null;
    }

}

