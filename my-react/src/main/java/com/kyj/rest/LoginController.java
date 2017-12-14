package com.kyj.rest;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.entity.User;
import com.kyj.entity.User_Roles;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;
import com.kyj.repository.UserRolesRepository;
import com.kyj.service.LoginService;

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
	
	@GetMapping("/test")
	public Map<String, Object> test() {
		Map<String, Object> map = new HashMap<>();
		
		Map<String, Object> userMap = new HashMap<>();
		userMap.put("id", "1");
		userMap.put("name", "aaa");
		userMap.put("email", "aaa@aaa.com");
		
		map.put("user", userMap);
		
		return map;
	}
	
	/*@GetMapping("/qqq")
	public String qqq() {
		return "qqq";
	}*/
	
/*	@GetMapping("qqq")
	public List<String> postqqq() {
		return loginService.loginUser();
	}*/
	
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
			List<User_Roles> userRoles = userRolesRepository.findRolesByCompositeKey_UserId(userId);
			List<Long> rolesId = userRoles.stream().map(ur -> ur.getCompositeKey().getRolesId()).collect(Collectors.toList());
			List<String>  rolesName = new ArrayList<>();
			String g = roleRepository.findOne(rolesId.get(0)).getRole();
			String gg = "";
			rolesId.forEach(ri -> {
				rolesName.add(roleRepository.findRoleById(ri).toString());
			});
		//	list = rolesName;
			list.add(g);
			System.out.println(user.get().getUsername());
		}
		return list;
	}
}
