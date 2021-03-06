package com.kyj.service;

import java.security.Principal;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;
import com.kyj.repository.UserRepository;

@Service
public class UserService {
	@PersistenceContext
	private EntityManager entityManager;
	
	@Autowired
	private UserRepository userRepository;
	
	public void removeUser() {
//		userRepository.delete(1L);
	}
	
	@Transactional
	public void setUserProfile(ProfileDTO profileDTO, Principal principal) {
		userRepository.setUserProfile(profileDTO, principal.getName());
	}
	
	@Transactional
	public void setUserCard(UserDTO userDTO, Principal principal) {
		userRepository.setUserCard(userDTO, principal.getName());
	}
}
