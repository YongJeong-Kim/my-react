package com.kyj.repository.impl;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.kyj.dto.ProfileDTO;
import com.kyj.entity.QUser;
import com.kyj.repository.querydsl.UserRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class UserRepositoryImpl implements UserRepositoryCustom {
	@PersistenceContext
	private EntityManager entityManager;
	
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
			.set(user.avatarExtension, profileDTO.getFile().getType().split("/")[1])
			.where(user.username.eq(username))
		.execute();
		
	}
}