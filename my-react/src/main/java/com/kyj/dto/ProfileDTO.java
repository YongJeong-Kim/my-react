package com.kyj.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class ProfileDTO {
	private String imagePreviewUrl;
	private String name;
	private String email;
	private ProfileImageFileDTO file;
//	private MultipartFile file;
	
	public ProfileDTO() {}
}
