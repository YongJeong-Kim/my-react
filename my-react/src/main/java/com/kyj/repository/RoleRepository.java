package com.kyj.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.entity.Roles;
import com.kyj.repository.querydsl.RoleRepositoryCustom;

public interface RoleRepository extends JpaRepository<Roles, Long> , RoleRepositoryCustom {
	List<String> findRoleById(Long id);
}
