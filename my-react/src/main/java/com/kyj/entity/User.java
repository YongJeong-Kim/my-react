package com.kyj.entity;

import java.util.List;

import javax.persistence.ColumnResult;
import javax.persistence.ConstructorResult;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.Lob;
import javax.persistence.ManyToMany;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.kyj.dto.UserDTO;

import lombok.Getter;
import lombok.Setter;

@SqlResultSetMapping(
	name = "findUserInfoMapping",
	classes =
		@ConstructorResult(
			targetClass = UserDTO.class,
			columns = {
				@ColumnResult(name="username", type=String.class),
				@ColumnResult(name="email", type=String.class),
				@ColumnResult(name="isEnabled", type=Boolean.class),
				@ColumnResult(name="isAccountNonExpired", type=Boolean.class),
				@ColumnResult(name="isAccountNonLocked", type=Boolean.class),
				@ColumnResult(name="isCredentialsNonExpired", type=Boolean.class),
				@ColumnResult(name="avatarEncodeImage", type=String.class),
				@ColumnResult(name="encodeImage", type=String.class),
				@ColumnResult(name="headline", type=String.class),
				@ColumnResult(name="notification", type=String.class),
				@ColumnResult(name="mergedRoles", type=String.class)
			}
		)
)
@NamedNativeQueries({
	@NamedNativeQuery(
		name="User.findUserInfo",
		query =		
		  "select"
		+ " distinct"
		+ " u.username as username,"
		+ " u.email as email,"
		+ " u.isEnabled as isEnabled,"
		+ " u.isAccountNonExpired as isAccountNonExpired,"
		+ " u.isAccountNonLocked as isAccountNonLocked,"
		+ " u.isCredentialsNonExpired as isCredentialsNonExpired,"
		+ " u.avatarEncodeImage as avatarEncodeImage,"
		+ " u.encodeImage as encodeImage,"
		+ " u.headline as headline,"
		+ " u.notification as notification,"
		+ " group_concat(r.role) as mergedRoles "
		+ "from"
		+ " User u"
		+ " inner join User_Roles ur"
		+ " inner join Roles r"
		+ " on u.username =:username and u.id = ur.user_id", resultSetMapping = "findUserInfoMapping")
})
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
	private Boolean isEnabled;
	private Boolean isAccountNonExpired;
	private Boolean isAccountNonLocked;
	private Boolean isCredentialsNonExpired;
	@Lob
	private String avatarEncodeImage;
	
	@Lob
	private String encodeImage;
	
	private String headline;
	
	@Lob
	private String notification;
	
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
		this.avatarEncodeImage = user.getAvatarEncodeImage();
		this.encodeImage = user.getEncodeImage();
	}
}
