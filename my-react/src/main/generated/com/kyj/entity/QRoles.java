package com.kyj.entity;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;
import com.mysema.query.types.path.PathInits;


/**
 * QRoles is a Querydsl query type for Roles
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QRoles extends EntityPathBase<Roles> {

    private static final long serialVersionUID = -34879087;

    public static final QRoles roles = new QRoles("roles");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath role = createString("role");

    public final ListPath<User, QUser> users = this.<User, QUser>createList("users", User.class, QUser.class, PathInits.DIRECT2);

    public QRoles(String variable) {
        super(Roles.class, forVariable(variable));
    }

    public QRoles(Path<? extends Roles> path) {
        super(path.getType(), path.getMetadata());
    }

    public QRoles(PathMetadata<?> metadata) {
        super(Roles.class, metadata);
    }

}

