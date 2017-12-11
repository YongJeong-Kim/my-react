package com.kyj.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import com.kyj.entity.QRoles;
import com.kyj.entity.QUser;
import com.kyj.entity.Roles;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
public class LoginService {
	@PersistenceContext
	private EntityManager entityManager;
	
	public List<String> loginUser(String username) {
		JPAQuery query = new JPAQuery(entityManager);
		QUser user = QUser.user;
		QRoles roles = QRoles.roles;
		
		return query.from(user).leftJoin(user.roles, roles).where(user.username.eq(username)).list(roles.role);
	}
}
