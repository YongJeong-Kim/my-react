package com.kyj.entity;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QUser_Role is a Querydsl query type for User_Role
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QUser_Role extends EntityPathBase<User_Role> {

    private static final long serialVersionUID = 672995678;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser_Role user_Role = new QUser_Role("user_Role");

    public final com.kyj.composite.QUserRolePK compositeKey;

    public QUser_Role(String variable) {
        this(User_Role.class, forVariable(variable), INITS);
    }

    public QUser_Role(Path<? extends User_Role> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QUser_Role(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QUser_Role(PathMetadata<?> metadata, PathInits inits) {
        this(User_Role.class, metadata, inits);
    }

    public QUser_Role(Class<? extends User_Role> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.compositeKey = inits.isInitialized("compositeKey") ? new com.kyj.composite.QUserRolePK(forProperty("compositeKey")) : null;
    }

}

