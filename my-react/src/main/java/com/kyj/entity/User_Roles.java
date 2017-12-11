package com.kyj.entity;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

import com.kyj.composite.UserRolesPK;

import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class User_Roles {	
	@EmbeddedId UserRolesPK compositeKey;
}
