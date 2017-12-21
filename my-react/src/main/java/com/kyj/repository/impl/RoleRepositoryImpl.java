package com.kyj.repository.impl;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.kyj.entity.QRoles;
import com.kyj.entity.QUser;
import com.kyj.repository.querydsl.RoleRepositoryCustom;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class RoleRepositoryImpl implements RoleRepositoryCustom {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Override
	public List<String> getLoginUserRoles(String username) {
		JPAQueryFactory queryFactory = new JPAQueryFactory(entityManager);
		QUser user = QUser.user;
		QRoles roles = QRoles.roles;
		System.out.println("test test");
		return queryFactory.selectFrom(user)
					.innerJoin(user.roles, roles).on(user.username.eq(username))
					.select(roles.role).fetch();
	}

}
