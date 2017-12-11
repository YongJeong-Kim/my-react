package com.kyj.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.composite.UserRolesPK;
import com.kyj.entity.User_Roles;

public interface UserRolesRepository extends JpaRepository<User_Roles, UserRolesPK>{
	Optional<User_Roles> findByCompositeKey(UserRolesPK userRolePk);
	
	List<User_Roles> findByCompositeKey_UserId(Long userId);
	
	List<User_Roles> findRolesByCompositeKey_UserId(Long userId);
	
	List<User_Roles> findByCompositeKey_RolesId(Long rolesId);
}
