package com.kyj.repository.querydsl;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;

public interface RoleRepositoryCustom {
	List<String> getLoginUserRoles(String username);
}
