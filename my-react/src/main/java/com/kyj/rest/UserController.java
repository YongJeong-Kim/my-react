package com.kyj.rest;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;
import com.kyj.entity.User;
import com.kyj.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private SessionRegistry sessionRegistry;
	
	@PostMapping("/set/profile")
	@Transactional
	public void setUserProfile(@RequestBody ProfileDTO profileDTO, Principal principal) {
		userService.setUserProfile(profileDTO, principal);
	}
	
	@PostMapping("/set/card")
	@Transactional
	public void setUserCard(@RequestBody UserDTO userDTO, Principal principal) {
		userService.setUserCard(userDTO, principal);
	}
	
	@PostMapping("/currentLoggedUsers")
	public List<User> currentLoggedUsers() {
		List<Object> principals = sessionRegistry.getAllPrincipals();
		List<User> currentLoggedUsers = new ArrayList<>();
		
		principals.forEach(principal -> {
			if (principal instanceof User) {
        currentLoggedUsers.add((User) principal);
			}
		});
		
		return currentLoggedUsers;
	}
	
}
