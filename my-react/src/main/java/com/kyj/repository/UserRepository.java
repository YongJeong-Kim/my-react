package com.kyj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.entity.User;

public interface UserRepository extends JpaRepository<User, Long> { //, UserQuerydsl {
	Optional<User> findByUsername(String username);
}
