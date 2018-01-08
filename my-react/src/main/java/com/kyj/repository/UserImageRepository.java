package com.kyj.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kyj.entity.UserImage;

public interface UserImageRepository extends JpaRepository<UserImage, Long> {
	Optional<UserImage> findByUser_Id(Long userId);
}
