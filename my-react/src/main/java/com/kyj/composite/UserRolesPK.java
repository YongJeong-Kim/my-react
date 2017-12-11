package com.kyj.composite;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class UserRolesPK implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(name = "user_id")
	private Long userId;
	
	@Column(name = "roles_id")
	private Long rolesId;
}
