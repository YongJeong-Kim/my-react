package com.kyj.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.composite.UserRolePK;
import com.kyj.entity.User_Role;

public interface UserRolesRepository extends JpaRepository<User_Role, UserRolePK>{
	Optional<User_Role> findByCompositeKey(UserRolePK userRolePk);
	
	List<User_Role> findByCompositeKey_UserId(Long userId);
	
	List<User_Role> findRoleByCompositeKey_UserId(Long userId);
	
	List<User_Role> findByCompositeKey_RoleId(Long roleId);
}
