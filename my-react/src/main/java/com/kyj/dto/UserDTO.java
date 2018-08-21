package com.kyj.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UserDTO {
	private String username;
	private String email;
	private Boolean isEnabled;
	private Boolean isAccountNonExpired;
	private Boolean isAccountNonLocked;
	private Boolean isCredentialsNonExpired;
	private String avatarEncodeImage;
	private String encodeImage;
	private String headline;
	private String notification;
	@JsonIgnore
	private String mergedRoles;
	
	private List<String> roles;
	
	public UserDTO(String headline, String notification) {
//		this.encodeImage = encodeImage;
		this.headline = headline;
		this.notification = notification;
	}
	
	public UserDTO(UserDTO userDto, List<String> roles) {
		this.username = userDto.getUsername();
		this.email = userDto.getEmail();
		this.isEnabled = userDto.getIsEnabled();
		this.isAccountNonExpired = userDto.getIsAccountNonExpired();
		this.isAccountNonLocked = userDto.getIsAccountNonLocked();
		this.isCredentialsNonExpired = userDto.getIsCredentialsNonExpired();
		this.avatarEncodeImage = userDto.getAvatarEncodeImage();
		this.encodeImage = userDto.getEncodeImage();
		this.headline = userDto.getHeadline();
		this.notification = userDto.getNotification();
		this.roles = roles;
	}
	
}
