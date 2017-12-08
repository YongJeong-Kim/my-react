package com.kyj.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.composite.UserRolePK;
import com.kyj.entity.User;
import com.kyj.entity.User_Role;
import com.kyj.repository.UserRolesRepository;
import com.kyj.service.UserService;

@RestController
public class RestHomeController {
	@Autowired
	private UserRolesRepository userRoleRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRolesRepository userRolesRepository;
	
	@GetMapping("/userRole/composite-key")
	public UserRolePK rest() {
		UserRolePK urpk = new UserRolePK();
		urpk.setUserId(1L);
//		urpk.setRoleId(1L);
		return userRoleRepository.findOne(urpk).getCompositeKey();
	}
	
	@GetMapping("/gg")
	public User u() {
		return userService.dd();
	}
	
	@GetMapping("/removeUser")
	public void ree() {
		userService.removeUser();
	}
	
	@GetMapping("/userrole")
	public List<User_Role> dg() {
		return userRolesRepository.findByCompositeKey_UserId(1L);
	}
}
