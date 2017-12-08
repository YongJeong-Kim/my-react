package com.kyj.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kyj.entity.QUser;
import com.kyj.entity.User;
import com.kyj.repository.UserRepository;
import com.mysema.query.jpa.impl.JPAQuery;

@Service
public class UserService {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private UserRepository userRepository;
	
	public User dd() {
		QUser user = QUser.user;
		JPAQuery query = new JPAQuery(entityManager);
		
		User us = query.from(user).uniqueResult(user);
		System.out.println(us.getId());
		return us;
	}
	
	public void removeUser() {
		userRepository.delete(1L);
	}
}
