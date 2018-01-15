package com.kyj.repository.querydsl;

import org.springframework.transaction.annotation.Transactional;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;

public interface UserRepositoryCustom {
	@Transactional
	public void setUserProfile(ProfileDTO profileDTO, String username);
	
	@Transactional
	public void setUserCard(UserDTO userDTO, String username);
}
