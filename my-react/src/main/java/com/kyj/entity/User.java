package com.kyj.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String username;
	private String password;
	private String email;
	private Boolean enabled;
	private Boolean ban;
	
	public User() {}
	
	@ManyToMany(fetch=FetchType.LAZY)
	@JoinTable(name = "user_role",
		joinColumns = @JoinColumn(name="role_id"),
		inverseJoinColumns = @JoinColumn(name="user_id"))
//	@JoinTable
	private List<Role> roles;
}
