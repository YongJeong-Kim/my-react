package com.kyj.rest;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;
import com.kyj.entity.User;
import com.kyj.service.UserService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private SessionRegistry sessionRegistry;
	
	@PostMapping("/set/profile")
	public void setUserProfile(@RequestBody ProfileDTO profileDTO, Principal principal) {
		userService.setUserProfile(profileDTO, principal);
	}
	
	@PostMapping("/set/card")
	public void setUserCard(@RequestBody UserDTO userDTO, Principal principal) {
		userService.setUserCard(userDTO, principal);
	}
	
	@PostMapping(value="/currentLoggedUsers", produces=MediaType.APPLICATION_JSON_VALUE)
	public Flux<User> currentLoggedUsers() {
		List<Object> principals = sessionRegistry.getAllPrincipals();
		
		return Flux.fromIterable(
	    principals.parallelStream()
	    .filter(p -> p instanceof User)
	    .map(p -> (User) p)
	    .collect(Collectors.toList()));
	}
	
}
