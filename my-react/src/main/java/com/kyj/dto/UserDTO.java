package com.kyj.dto;

import java.util.List;

import com.kyj.entity.User;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
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
	private String avatarExtension;
	private String encodeImage;
	private String extension;
	private List<String> roles;
	
	public UserDTO(User user, List<String> roles) {
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.isEnabled = user.getIsEnabled();
		this.isAccountNonExpired = user.getIsAccountNonExpired();
		this.isAccountNonLocked = user.getIsAccountNonLocked();
		this.isCredentialsNonExpired = user.getIsCredentialsNonExpired();
		this.avatarEncodeImage = user.getAvatarEncodeImage();
		this.avatarExtension = user.getAvatarExtension();
		this.encodeImage = user.getEncodeImage();
		this.extension = user.getExtension();
		this.roles = roles;
	}
	
}
