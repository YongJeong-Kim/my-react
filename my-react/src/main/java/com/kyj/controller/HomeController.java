package com.kyj.controller;

import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {
	@GetMapping("/")
	public String index(Principal principal) {
		System.out.println("login username : " + principal.getName());

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println("user password : " + userDetails.getPassword());
		System.out.println("user name : " + userDetails.getUsername());
		System.out.println("user isEnabled : " + userDetails.isEnabled());
		System.out.println("user role : " + userDetails.getAuthorities());
		System.out.println("user isAccountNonExpired : " + userDetails.isAccountNonExpired());
		System.out.println("user isAccountNonLocked : " + userDetails.isAccountNonLocked());
		System.out.println("user isCredentialsNonExpired : " + userDetails.isCredentialsNonExpired());

//		SecurityContextHolder.getContext().getAuthentication().setAuthenticated(false);
		return "redirect:/home";
	}

	@GetMapping(value= {"/home", "/home/nnn/asd"})
	public ModelAndView home(ModelAndView mav, Principal principal) {
		System.out.println("in /home");
		System.out.println("login username : " + principal.getName());

		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println("user password : " + userDetails.getPassword());
		System.out.println("user name : " + userDetails.getUsername());
		System.out.println("user isEnabled : " + userDetails.isEnabled());
		System.out.println("user role : " + userDetails.getAuthorities());
		System.out.println("user isAccountNonExpired : " + userDetails.isAccountNonExpired());
		System.out.println("user isAccountNonLocked : " + userDetails.isAccountNonLocked());
		System.out.println("user isCredentialsNonExpired : " + userDetails.isCredentialsNonExpired());

		mav.setViewName("index");
		return mav;
	}

	@GetMapping("/login")
	public String login() {
		return "login";
	}

//	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')") success
//	@PreAuthorize("hasAuthority('USER') or hasAuthority('ADMIN')") success
    @PreAuthorize("hasAuthority('ROLE_USER')")
	@GetMapping("/ggg/ggg")
	public String ggg(Principal principal) {
    	System.out.println(principal);
		return "ggg";
	}

	@GetMapping("/error/403")
	public String accessDenied(Principal principal) {
		if (principal == null) {
    		return "redirect:/login";
    	}
    	else {
    		return "/error/403";
    	}
	}

	// 이 컨트롤러가 없고 config/ErrorPageConfig.java가 없어도 404에러일 경우 뷰 error/404.html 가 자동 매핑됨
	@GetMapping("/error/404")
	public String notFound(Principal principal, HttpServletRequest request) {
		System.out.println("in");
		System.out.println(principal);
		System.out.println(request.getRemoteUser());
		return "/error/404";
	}

/*	@GetMapping("/error/500")
	public String internalServerError() {
		return "/error/500";
	}*/
}
