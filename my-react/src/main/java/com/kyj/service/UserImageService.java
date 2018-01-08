package com.kyj.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kyj.entity.UserImage;
import com.kyj.repository.UserImageRepository;

@Service
public class UserImageService {
	@Autowired
	private UserImageRepository avatarRepository;
	
	public UserImage findByUser_Id(Long userId) {
		Optional<UserImage> avatar = avatarRepository.findByUser_Id(userId);
		if (avatar.isPresent())
			return avatar.get();
		else
			return null;
	}
}
