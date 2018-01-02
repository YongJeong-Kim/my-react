package com.kyj.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class UserImage {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	private String avatarFilename;
	private String avatarPath;
	@Lob
	private String avatarEncodeImage;
	
	private String avatarExtension;
	
	private String filename;
	private String path;
	@Lob
	private String encodeImage;
	
	private String extension;
	
	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	private User user;
}
