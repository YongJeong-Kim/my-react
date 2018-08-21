package com.kyj.repository.impl;

import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.kyj.composite.QUserRolesPK;
import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;
import com.kyj.entity.QRoles;
import com.kyj.entity.QUser;
import com.kyj.entity.QUser_Roles;
import com.kyj.entity.User;
import com.kyj.repository.querydsl.UserRepositoryCustom;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.SimpleExpression;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.sql.JPASQLQuery;
import com.querydsl.sql.MySQLTemplates;
import com.querydsl.sql.SQLExpressions;
import com.querydsl.sql.SQLTemplates;

public class UserRepositoryImpl implements UserRepositoryCustom {
	@PersistenceContext
	private EntityManager entityManager;
	
	final static SQLTemplates templates = new MySQLTemplates();
	
	@Override
	public void setUserProfile(ProfileDTO profileDTO, String username) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
		QUser user = QUser.user;
		/*QUserImage userImage = QUserImage.userImage;
		System.out.println(profileDTO.getFile().getName());
		System.out.println(profileDTO.getFile().getName().split(".").toString());
		queryFactory
			.update(userImage)
			.set(userImage.avatarExtension, profileDTO.getFile().getType().split("/")[1])
			.set(userImage.avatarEncodeImage, profileDTO.getImagePreviewUrl())
			.set(userImage.avatarFilename, profileDTO.getFile().getName().split(".")[0])
			.where(userImage.id.eq(
				SQLExpressions.select(user.id).from(user).where(user.username.eq(username))
			))
		.execute();*/
		
		queryFactory
			.update(user)
			.set(user.avatarEncodeImage, profileDTO.getImagePreviewUrl())
			.where(user.username.eq(username))
		.execute();
	}

	@Override
	public void setUserCard(UserDTO userDTO, String username) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
		QUser user = QUser.user;
		
		queryFactory
			.update(user)
			.set(user.encodeImage, userDTO.getEncodeImage())
			.set(user.headline, userDTO.getHeadline())
			.set(user.notification, userDTO.getNotification())
			.where(user.username.eq(username))
		.execute();	
	}

	@Override
	public Optional<UserDTO> findUserInfo(String username) {
		QUser user = QUser.user;
		QUser subuser = new QUser("subuser");
		QRoles role = QRoles.roles;
		QUser_Roles ur = QUser_Roles.user_Roles;
		QUserRolesPK urpk = new QUserRolesPK("user_roles");
		
/*		JPQLQuery<User> dddd = JPAExpressions.selectFrom(subuser).where(subuser.username.eq("aaa"));
		JPAQuery<User> q = new JPAQuery<>();
		q.select(subuser).from(subuser).where(subuser.username.eq("aaa"));*/
		
		SimpleExpression<Tuple> subQuery = SQLExpressions
			.select(user.encodeImage, user.headline, user.notification)
				.from(user)
					.join(ur)
						.on(urpk.userId.eq(user.id))
					.join(role)
						.on(urpk.rolesId.eq(role.id))
					.where(role.role.eq("ROLE_ADMIN")).as(subuser);
		
		JPASQLQuery<?> query = new JPASQLQuery<Void>(entityManager, templates);
		
		return Optional.ofNullable(
			query.select(Projections.fields(UserDTO.class,
				SQLExpressions.groupConcat(role.role, ",").as("mergedRoles"),
				user.username,
				user.email,
				user.isEnabled,
				user.isAccountNonExpired,
				user.isAccountNonLocked,
				user.isCredentialsNonExpired,
				user.avatarEncodeImage,
				subuser.encodeImage,
				subuser.headline,
				subuser.notification))
			.distinct()
			.from(subQuery, user)
				.innerJoin(ur)
					.on(urpk.userId.eq(user.id))
				.innerJoin(role)
					.on(role.id.eq(urpk.rolesId))
			.where(user.username.eq(username))
			.fetchOne());
	}
}
