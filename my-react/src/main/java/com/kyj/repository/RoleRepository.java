package com.kyj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.entity.Roles;

public interface RoleRepository extends JpaRepository<Roles, Long> {
	List<String> findRoleById(Long id);
}
