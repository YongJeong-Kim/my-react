package com.kyj.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
public class UserDTO {
	/*private User user;
	private List<String> roles;
	private String role;
	
	public UserDTO() {}
	
	@QueryProjection
	public UserDTO(User user) {
		this.user = user;
	}*/
	
/*	@QueryProjection
	public UserDTO(User user, List<Roles> roles) {
		this.user = user;
		this.role = roles.getRole();
	}*/
	
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
	
/*	public UserDTO(String username,
				   String email,
				   Boolean isEnabled,
				   Boolean isAccountNonExpired,    
				   Boolean isAccountNonLocked,
				   Boolean isCredentialsNonExpired,
				   String avatarEncodeImage,
				   String encodeImage,
				   String headline,
				   String notification,
				   String mergedRoles) {
		this.username = username;
		this.email = email;
		this.isEnabled = isEnabled;
		this.isAccountNonExpired = isAccountNonExpired;
		this.isAccountNonLocked = isAccountNonLocked;
		this.isCredentialsNonExpired = isCredentialsNonExpired;
		this.avatarEncodeImage = avatarEncodeImage;
		this.encodeImage = encodeImage;
		this.headline = headline;
		this.notification = notification;
		this.mergedRoles = mergedRoles;
	}*/
	
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
