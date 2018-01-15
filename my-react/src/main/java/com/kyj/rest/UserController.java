package com.kyj.rest;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;
import com.kyj.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping(value="/set/profile")
	public void setUserProfile(@RequestBody ProfileDTO profileDTO, Principal principal) {
		userService.setUserProfile(profileDTO, principal);
	}
	
	@PostMapping("/set/card")
	public void setUserCard(@RequestBody UserDTO userDTO, Principal principal) {
		userService.setUserCard(userDTO, principal);
	}
	
}
