package com.kyj.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kyj.dto.UserDTO;
import com.kyj.entity.User;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;

@Service
public class LoginService {
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<String> getLoginUserRoles(String username) {
		return roleRepository.getLoginUserRoles(username);
	}
	
	public Map<String, Object> getLoginUserInfo(String username) {
		Map<String, Object> map = new HashMap<>();
		Optional<User> user = userRepository.findByUsername(username);
		
		user.ifPresent(u -> {
			List<String> roles = getLoginUserRoles(username);
			UserDTO userDTO = new UserDTO(u, roles);
			map.put("user", userDTO);
		});
		
		return map;
	}
}
