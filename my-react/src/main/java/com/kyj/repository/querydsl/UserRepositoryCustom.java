package com.kyj.repository.querydsl;

import com.kyj.dto.ProfileDTO;
import com.kyj.dto.UserDTO;

public interface UserRepositoryCustom {
	void setUserProfile(ProfileDTO profileDTO, String username);
	void setUserCard(UserDTO userDTO, String username);
}
