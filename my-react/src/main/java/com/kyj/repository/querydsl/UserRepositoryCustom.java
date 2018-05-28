package com.kyj.repository.querydsl;

import java.util.Optional;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;

public interface UserRepositoryCustom {
	void setUserProfile(ProfileDTO profileDTO, String username);
	void setUserCard(UserDTO userDTO, String username);
	Optional<UserDTO> findUserInfo(String username);
}
