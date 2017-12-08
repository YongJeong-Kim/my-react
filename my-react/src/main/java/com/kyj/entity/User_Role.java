package com.kyj.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import com.kyj.composite.UserRolePK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User_Role {	
	@EmbeddedId UserRolePK compositeKey;
}
