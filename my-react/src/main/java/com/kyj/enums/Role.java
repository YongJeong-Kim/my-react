package com.kyj.enums;

import lombok.Getter;

@Getter
public enum Role {
  USER(RoleName.ROLE_USER), ADMIN(RoleName.ROLE_ADMIN);
  private String roleName;

  private Role(String roleName) {
    this.roleName = roleName; 
  }
  
  public static class RoleName {
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";
  }
}
