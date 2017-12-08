package com.kyj.security;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.kyj.entity.User;
import com.kyj.entity.User_Role;
import com.kyj.repository.RoleRepository;
import com.kyj.repository.UserRepository;
import com.kyj.repository.UserRolesRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{
	private final UserRepository userRepository;
	private final UserRolesRepository userRolesRepository;
	private final RoleRepository roleRepository;
	
	@Autowired
    public CustomUserDetailsService(UserRepository userRepository, UserRolesRepository userRolesRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.userRolesRepository = userRolesRepository;
        this.roleRepository = roleRepository;
    }
        
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Optional<User> user = userRepository.findByUsername(username);
		if(!user.isPresent()){
			throw new UsernameNotFoundException("No user present with username: " + username);
		}
		else{
			Long userId = user.map(User::getId).orElse(null);
			List<User_Role> userRoles = userRolesRepository.findRoleByCompositeKey_UserId(userId);
			List<Long> rolesId = userRoles.stream().map(ur -> ur.getCompositeKey().getRoleId()).collect(Collectors.toList());
			List<String>  rolesName = new ArrayList<>(); 
			rolesId.forEach(ri -> {
				rolesName.add(roleRepository.findOne(ri).getRole());
			});
			return new CustomUserDetails(user.get(), rolesName);
		}
	}
		
}