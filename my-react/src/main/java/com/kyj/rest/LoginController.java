package com.kyj.rest;

import java.security.Principal;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kyj.service.LoginService;

import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/login")
public class LoginController {
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private LoginService loginService;

	@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_USER')")
	@GetMapping("/user/info")
	public Mono<Map<String, Object>> loginUserInfo(Principal principal) {
/*		List<Roles> roles = roleRepository.findAll();
		Roles r = roleRepository.findOne(1L);

		ObjectMapper mapper = new ObjectMapper();
		@SuppressWarnings("unchecked")
		Map<String, Object> map = mapper.convertValue(r, Map.class);*/
		return loginService.getLoginUserInfo(principal.getName());
	/*	JPAQueryFactory query = new JPAQueryFactory(entityManager);
		QUser user = QUser.user;
		QRoles roles = QRoles.roles;
		QRoles r = new QRoles("r");
		QUser_Roles qur = QUser_Roles.user_Roles;

		QUserRolesPK ur = QUserRolesPK.userRolesPK;*/

/*		Optional<User> userr = userRepository.findByUsername("aaa");
		Map<String, Object> map = new HashMap<>();
		List<String> ro = new ArrayList<>();
		userr.ifPresent(u -> {
			List<Roles> rs = u.getRoles();
			rs.forEach(r -> ro.add(r.getRole()));
		});
		UserDTO udto = new UserDTO();
		udto.setRoles(ro);
		map.put("roles", udto.getRoles());
		ObjectMapper mapper = new ObjectMapper();
		User ser = new User();
		ser.setUsername("bbbbbbb");
		ser.setId(222L);*/
//		mapper.convertValue(userr.get().getRoles(), Map.class);
//		System.out.println(mapper);
//		query.from(user).where(user.username.eq(new JPASubQuery().from(user).where(user.id.eq(1L)).unique(user.username)));
//		query.from(user).innerJoin(user.roles, roles).on(user.username.eq("aaa")).distinct().unique(Projections.constructor(UserDTO.class, user))
//		return query.from(user).innerJoin(user.roles, roles).on(user.username.eq("aaa")).list(Projections.bean(Test2.class, user.id, roles.role));

//		return query.from(user).innerJoin(user.roles, roles).on(user.username.eq("aaa")).list(Projections.constructor(UserDTO.class, user, roles));
//		return query.from(user).innerJoin(user.roles, roles).on(user.username.eq("aaa")).list(Projections.constructor(UserDTO.class, user, roles)).add;
//		return query.from(user).innerJoin(user.roles, roles).on(user.username.eq("aaa")).list(Projections.constructor(UserDTO.class, user));
//		return query.from(roles).transform(groupBy(roles).as(list(roles.role)));
//		return query.selectFrom(user).innerJoin(user.roles, roles).on(user.username.eq("aaa"))
//				.select(roles).fetch();
				//.transform(GroupBy.groupBy(roles.role).as(list(roles)));

	}
}
