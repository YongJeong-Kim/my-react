package com.kyj.composite;

import java.io.Serializable;

import javax.persistence.Embeddable;

import lombok.Getter;
import lombok.Setter;

@Embeddable
@Getter @Setter
public class CompositeUserRole implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long personId;
	private Long roleId;
	
	public CompositeUserRole() {}
	
	public CompositeUserRole(Long personId, Long roleId) {
		this.personId = personId;
		this.roleId = roleId;
	}
}
