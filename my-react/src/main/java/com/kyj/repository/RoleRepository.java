package com.kyj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
	List<String> findRoleById(Long id);
}
