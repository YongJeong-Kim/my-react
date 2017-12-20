package com.kyj.composite;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QCompositeUserRole is a Querydsl query type for CompositeUserRole
 */
@Generated("com.querydsl.codegen.EmbeddableSerializer")
public class QCompositeUserRole extends BeanPath<CompositeUserRole> {

    private static final long serialVersionUID = -2006565854L;

    public static final QCompositeUserRole compositeUserRole = new QCompositeUserRole("compositeUserRole");

    public final NumberPath<Long> personId = createNumber("personId", Long.class);

    public final NumberPath<Long> roleId = createNumber("roleId", Long.class);

    public QCompositeUserRole(String variable) {
        super(CompositeUserRole.class, forVariable(variable));
    }

    public QCompositeUserRole(Path<? extends CompositeUserRole> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCompositeUserRole(PathMetadata metadata) {
        super(CompositeUserRole.class, metadata);
    }

}

