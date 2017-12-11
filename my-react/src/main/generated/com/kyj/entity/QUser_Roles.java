package com.kyj.entity;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QUser_Roles is a Querydsl query type for User_Roles
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QUser_Roles extends EntityPathBase<User_Roles> {

    private static final long serialVersionUID = -611970347;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QUser_Roles user_Roles = new QUser_Roles("user_Roles");

    public final com.kyj.composite.QUserRolesPK compositeKey;

    public QUser_Roles(String variable) {
        this(User_Roles.class, forVariable(variable), INITS);
    }

    public QUser_Roles(Path<? extends User_Roles> path) {
        this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QUser_Roles(PathMetadata<?> metadata) {
        this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
    }

    public QUser_Roles(PathMetadata<?> metadata, PathInits inits) {
        this(User_Roles.class, metadata, inits);
    }

    public QUser_Roles(Class<? extends User_Roles> type, PathMetadata<?> metadata, PathInits inits) {
        super(type, metadata, inits);
        this.compositeKey = inits.isInitialized("compositeKey") ? new com.kyj.composite.QUserRolesPK(forProperty("compositeKey")) : null;
    }

}

