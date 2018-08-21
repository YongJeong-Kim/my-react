package com.kyj.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.composite.UserRolesPK;
import com.kyj.entity.User;
import com.kyj.entity.User_Roles;
import com.kyj.repository.UserRepository;
import com.kyj.repository.UserRolesRepository;
import com.kyj.service.UserService;

import reactor.core.publisher.Mono;

@RestController
public class RestHomeController {
	@Autowired
	private UserRolesRepository userRoleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRolesRepository userRolesRepository;
	
	@Autowired
	@Qualifier("sessionRegistry")
	private SessionRegistry sessionRegistry;
	
	@GetMapping("/allUsers")
	public List<User> allUsers() {
		List<Object> principals = sessionRegistry.getAllPrincipals();
		List<User> currentLoggedUsers = new ArrayList<>();
		
		principals.forEach(principal -> {
			if (principal instanceof User) {
        currentLoggedUsers.add((User) principal);
			}
		});
		
		return currentLoggedUsers;
	}
	
	@GetMapping("/www")
	Mono<User> findOne() {
		Optional<User> u = userRepository.findByUsername("aaa");
		return Mono.justOrEmpty(u);
	}
	
/*	@GetMapping("/rrr")
	User findOne2() {
		return userRepository.findByUsername("aaa").get();
	}
	
	@GetMapping("/rrr")
	Flux<User> findOne2() {
		return Flux.fromuserRepository.findAllAsStream();
	}*/
	
	@GetMapping("/userRole/composite-key")
	public UserRolesPK rest() {
		UserRolesPK urpk = new UserRolesPK();
		urpk.setUserId(1L);
//		urpk.setRoleId(1L);
//		return userRoleRepository.findOne(urpk).getCompositeKey();
		return null;
	}
	
	@GetMapping("/ttest")
	public void ddd() {
		userRepository.findUserInfo("aaa");
	}
	
	@GetMapping("/removeUser")
	public void ree() {
		userService.removeUser();
	}
	
	@GetMapping("/userrole")
	public List<User_Roles> dg() {
		return userRolesRepository.findByCompositeKey_UserId(1L);
	}
}
