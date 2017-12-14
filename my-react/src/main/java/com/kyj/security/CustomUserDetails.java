package com.kyj.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import com.kyj.entity.User;

public class CustomUserDetails extends com.kyj.entity.User implements UserDetails {	
	
	private static final long serialVersionUID = 1L;
	private List<String> userRoles;
	private User user;

	public CustomUserDetails(com.kyj.entity.User user, List<String> userRoles){
		super(user);
		this.userRoles = userRoles;
		this.user = user;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		String roles = StringUtils.collectionToCommaDelimitedString(userRoles);			
		return AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
//		return true;
		return user.getIsAccountNonExpired();
	}
	@Override
	public boolean isAccountNonLocked() {
//		return true;
		return user.getIsAccountNonLocked();
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
//		return true;
		return user.getIsCredentialsNonExpired();
	}
	@Override
	public boolean isEnabled() {
//		return true;
		return user.getIsEnabled();
	}

	@Override
	public String getUsername() {
		return super.getUsername();
	}
}