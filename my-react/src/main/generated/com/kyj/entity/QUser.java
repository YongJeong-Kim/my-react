package com.kyj.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.querydsl.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User> {

    private static final long serialVersionUID = 1661535863L;

    public static final QUser user = new QUser("user");

    public final StringPath avatarEncodeImage = createString("avatarEncodeImage");

    public final StringPath email = createString("email");

    public final StringPath encodeImage = createString("encodeImage");

    public final StringPath headline = createString("headline");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final BooleanPath isAccountNonExpired = createBoolean("isAccountNonExpired");

    public final BooleanPath isAccountNonLocked = createBoolean("isAccountNonLocked");

    public final BooleanPath isCredentialsNonExpired = createBoolean("isCredentialsNonExpired");

    public final BooleanPath isEnabled = createBoolean("isEnabled");

    public final StringPath notification = createString("notification");

    public final StringPath password = createString("password");

    public final ListPath<Roles, QRoles> roles = this.<Roles, QRoles>createList("roles", Roles.class, QRoles.class, PathInits.DIRECT2);

    public final StringPath username = createString("username");

    public QUser(String variable) {
        super(User.class, forVariable(variable));
    }

    public QUser(Path<? extends User> path) {
        super(path.getType(), path.getMetadata());
    }

    public QUser(PathMetadata metadata) {
        super(User.class, metadata);
    }

}

