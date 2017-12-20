package com.kyj.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QRoles is a Querydsl query type for Roles
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QRoles extends EntityPathBase<Roles> {

    private static final long serialVersionUID = -34879087L;

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

    public QRoles(PathMetadata metadata) {
        super(Roles.class, metadata);
    }

}

