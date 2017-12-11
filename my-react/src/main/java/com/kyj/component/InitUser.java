package com.kyj.component;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.kyj.entity.Roles;
import com.kyj.entity.User;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;

@Component
public class InitUser {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository rolesRepository;
	
	@PostConstruct
	public void initUser() {
		if (userRepository.findAll().size() == 0) {
			User u = new User();
			u.setEmail("aaa@email.com");
			u.setUsername("aaa");
			
			PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode("1234");
			
			u.setPassword(hashedPassword);
			Roles r = new Roles();
			r.setRole("ROLE_ADMIN");
			
			List<Roles> rs = new ArrayList<>();
			rs.add(r);
			u.setRoles(rs);
			
			rolesRepository.save(r);
			userRepository.save(u);
		}
	}
}
