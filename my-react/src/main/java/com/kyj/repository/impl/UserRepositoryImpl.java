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
import com.kyj.repository.querydsl.UserRepositoryCustom;
import com.querydsl.core.types.Projections;
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
		QRoles role = QRoles.roles;
		QUser_Roles ur = QUser_Roles.user_Roles;
		QUserRolesPK urpk = new QUserRolesPK("user_roles");
		
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
				user.encodeImage,
				user.headline,
				user.notification))
			.distinct()
			.from(user)
				.innerJoin(ur)
					.on(urpk.userId.eq(user.id))
				.innerJoin(role)
					.on(role.id.eq(urpk.rolesId))
			.where(user.username.eq(username))
			.fetchOne());
	}
}
