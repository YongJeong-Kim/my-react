package com.kyj.rest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.entity.User;
import com.kyj.entity.User_Role;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;
import com.kyj.repository.UserRolesRepository;

@RestController
public class LoginController {
/*	@PostMapping("/login")
	public void login(User user) {
		System.out.println("login : " + user.getUsername());
	}*/
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private UserRolesRepository userRolesRepository;
	@Autowired
	private RoleRepository roleRepository;
	
	/*@GetMapping("/qqq")
	public String qqq() {
		return "qqq";
	}*/
	
	@GetMapping("qqq")
	public String postqqq() {
		return "post qqq";
	}
	
	@GetMapping("/ttest")
	public List<String> dd() {
		List<User> uu = userRepository.findAll();
		Optional<User> user = userRepository.findByUsername("aaa");
		List<String> list = new ArrayList<>();
		if(!user.isPresent()){
	//		throw new UsernameNotFoundException("No user present with username: " + username);
		}
		else{
//			List<String> userRoles = userRolesRepository.findRoleByUserName(username);
			Long userId = user.map(User::getId).orElse(null);
			List<User_Role> userRoles = userRolesRepository.findRoleByCompositeKey_UserId(userId);
			List<Long> rolesId = userRoles.stream().map(ur -> ur.getCompositeKey().getRoleId()).collect(Collectors.toList());
			List<String>  rolesName = new ArrayList<>();
			String g = roleRepository.findOne(rolesId.get(0)).getRole();
			String gg = "";
			/*rolesId.forEach(ri -> {
				rolesName.add(roleRepository.findRoleById(ri).toString());
			});*/
		//	list = rolesName;
			list.add(g);
			System.out.println(user.get().getUsername());
		}
		return list;
	}
}
