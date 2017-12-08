package com.kyj.composite;

import static com.mysema.query.types.PathMetadataFactory.*;

import com.mysema.query.types.path.*;

import com.mysema.query.types.PathMetadata;
import javax.annotation.Generated;
import com.mysema.query.types.Path;


/**
 * QUserRolePK is a Querydsl query type for UserRolePK
 */
@Generated("com.mysema.query.codegen.EmbeddableSerializer")
public class QUserRolePK extends BeanPath<UserRolePK> {

    private static final long serialVersionUID = 538523714;

    public static final QUserRolePK userRolePK = new QUserRolePK("userRolePK");

    public final NumberPath<Long> roleId = createNumber("roleId", Long.class);

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QUserRolePK(String variable) {
        super(UserRolePK.class, forVariable(variable));
    }

    public QUserRolePK(Path<? extends UserRolePK> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUserRolePK(PathMetadata<?> metadata) {
        super(UserRolePK.class, metadata);
    }

}

