package com.kyj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.kyj.dto.UserDTO;
import com.kyj.entity.User;
import com.kyj.repository.querydsl.UserRepositoryCustom;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {
	Optional<User> findByUsername(String username);
	
	@Query(name="User.findUserInfo")
	Optional<UserDTO> findUserInfo(@Param("username") String username);
}
