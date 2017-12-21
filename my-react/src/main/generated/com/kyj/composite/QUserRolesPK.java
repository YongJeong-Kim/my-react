package com.kyj.composite;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QUserRolesPK is a Querydsl query type for UserRolesPK
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QUserRolesPK extends BeanPath<UserRolesPK> {

    private static final long serialVersionUID = -485600185L;

    public static final QUserRolesPK userRolesPK = new QUserRolesPK("userRolesPK");

    public final NumberPath<Long> rolesId = createNumber("rolesId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUserRolesPK(String variable) {
        super(UserRolesPK.class, forVariable(variable));
    }

    public QUserRolesPK(Path<? extends UserRolesPK> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserRolesPK(PathMetadata metadata) {
        super(UserRolesPK.class, metadata);
    }

}

