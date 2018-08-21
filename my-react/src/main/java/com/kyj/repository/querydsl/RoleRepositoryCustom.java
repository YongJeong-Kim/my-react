package com.kyj.repository.querydsl;

import java.util.List;

public interface RoleRepositoryCustom {
	List<String> getLoginUserRoles(String username);
}
