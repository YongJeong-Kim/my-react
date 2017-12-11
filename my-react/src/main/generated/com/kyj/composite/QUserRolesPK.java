package com.kyj.composite;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QUserRolesPK is a Querydsl query type for UserRolesPK
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QUserRolesPK extends BeanPath<UserRolesPK> {

    private static final long serialVersionUID = -485600185;

    public static final QUserRolesPK userRolesPK = new QUserRolesPK("userRolesPK");

    public final NumberPath<Long> rolesId = createNumber("rolesId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUserRolesPK(String variable) {
        super(UserRolesPK.class, forVariable(variable));
    }

    public QUserRolesPK(Path<? extends UserRolesPK> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserRolesPK(PathMetadata<?> metadata) {
        super(UserRolesPK.class, metadata);
    }

}

