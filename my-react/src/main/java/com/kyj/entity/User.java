package com.kyj.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import org.springframework.data.annotation.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonIgnore
	private Long id;
	private String username;
	
	@JsonIgnore
	private String password;
	private String email;
	@Column(name="isEnabled")
	private Boolean isEnabled;
	@Column(name="isAccountNonExpired")
	private Boolean isAccountNonExpired;
	@Column(name="isAccountNonLocked")
	private Boolean isAccountNonLocked;
	@Column(name="isCredentialsNonExpired")
	private Boolean isCredentialsNonExpired;
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "user_roles",
		joinColumns = @JoinColumn(name="user_id"),
		inverseJoinColumns = @JoinColumn(name="roles_id"))
	@JsonIgnore
	private List<Roles> roles;

	public User() {}
	
	public User(User user) {
		this.id = user.getId();
		this.username = user.getUsername();
		this.password = user.getPassword();
		this.email = user.getEmail();
		this.isEnabled = user.getIsEnabled();
		this.isAccountNonExpired = user.getIsAccountNonExpired();
		this.isAccountNonLocked = user.getIsAccountNonLocked();
		this.isCredentialsNonExpired = user.getIsCredentialsNonExpired();
	}
}
