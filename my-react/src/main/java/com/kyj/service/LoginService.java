package com.kyj.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kyj.dto.UserDTO;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;

import reactor.core.publisher.Mono;

@Service
public class LoginService {
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public List<String> getLoginUserRoles(String username) {
		return roleRepository.getLoginUserRoles(username);
	}
	
	public Mono<Map<String, Object>> getLoginUserInfo(String username) {
		Map<String, Object> map = new HashMap<>();
		Optional<UserDTO> userInfo = userRepository.findUserInfo(username);

		userInfo.ifPresent(u -> {
			String[] roleArr= u.getMergedRoles().split(",");
			List<String> roles = new ArrayList<>();
			for ( int i = 0; i < roleArr.length; i++) {
				roles.add(roleArr[i]);
			}
			UserDTO userDTO = new UserDTO(u, roles);
			map.put("user", userDTO);
		});
		
		return Mono.just(map);
	}
}
