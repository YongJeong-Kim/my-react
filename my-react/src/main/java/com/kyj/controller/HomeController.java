package com.kyj.controller;

import java.io.IOException;
import java.net.URISyntaxException;
import java.security.Principal;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

import com.kyj.component.EncodeDecode;
import com.kyj.service.UserService;

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
	
	@GetMapping("/home")
	public String home(Principal principal) {
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
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}

	@GetMapping("/admin")
    public String admin() {
        return "/admin";
    }

    @GetMapping("/user")
    public String user() {
    	System.out.println();
        return "/user";
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
	
	@Autowired
	private EncodeDecode encodeDecode;
	
	@GetMapping("/test")
	public ModelAndView aa(ModelAndView mav) throws IOException, URISyntaxException {
		String imagePath = "C:\\Users\\yjk\\Desktop\\yjk\\workspace\\git\\my-react\\my-react\\src\\main\\resources\\static\\images\\9k=.jpg";
		String base64Image = encodeDecode.encodeImage(imagePath);
		
		// decode : encode String, output path
		encodeDecode.decodeImage(base64Image, "C:\\Users\\yjk\\Desktop\\aabbcc.png");

//		System.out.println(base64Image);
		mav.addObject("base64Image", base64Image);
		mav.setViewName("test");
		
	//	encodeDecode.encodeString();
		
		return mav;
	}
	
}
