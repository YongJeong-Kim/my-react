package com.kyj.service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kyj.repository.UserRepository;

@Service
public class UserService {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private UserRepository userRepository;
	
	public void removeUser() {
		userRepository.delete(1L);
	}
}
