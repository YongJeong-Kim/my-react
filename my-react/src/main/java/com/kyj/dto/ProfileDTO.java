package com.kyj.dto;

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

@Getter @Setter
class ProfileImageFileDTO {
	private Long lastModified;
	private String lastModifiedDate;
	private String name;
	private Long size;
	private String type;
	private String webkitRelativePath;
	
	public ProfileImageFileDTO() {}
}