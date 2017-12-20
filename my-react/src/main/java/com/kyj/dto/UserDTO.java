package com.kyj.dto;

import java.util.List;

import javax.persistence.Column;

import com.kyj.entity.User;
import com.querydsl.core.annotations.QueryProjection;

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
	
	private Long id;
	private String username;
	private String email;
	private Boolean isEnabled;
	private Boolean isAccountNonExpired;
	private Boolean isAccountNonLocked;
	private Boolean isCredentialsNonExpired;
	private String role;
	
}
