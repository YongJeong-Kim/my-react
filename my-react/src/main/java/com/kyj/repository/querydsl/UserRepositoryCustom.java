package com.kyj.repository.querydsl;

import org.springframework.transaction.annotation.Transactional;

import com.kyj.dto.ProfileDTO;

public interface UserRepositoryCustom {
	@Transactional
	public void setUserProfile(ProfileDTO profileDTO, String username);
}
