package com.kyj.security;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kyj.entity.User;
import com.kyj.repository.UserRepository;
import com.kyj.service.LoginService;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	private final UserRepository userRepository;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
        
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
		if(!user.isPresent()){
			throw new UsernameNotFoundException("No user present with username: " + username);
		}
		else{
			return new CustomUserDetails(user.get(), loginService.getLoginUserRoles(user.get().getUsername()));
		}
	}
		
}