package com.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.example.entity.User;

@Controller
public class HomeController {
	@GetMapping("/")
	public String home() {
		return "index";
	}
	
	@GetMapping("/login")
	public String login() {
		return "login";
	}
	
	@GetMapping("/uuu")
	public @ResponseBody String uuu(String username, String password) {
		System.out.println(username);
		System.out.println(password);
		return "uuu";
	}
	
	@PostMapping(value="/post", produces="application/json")
	public ModelAndView post(ModelAndView mav, @RequestBody User user) {
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		mav.setViewName("index");
		return mav;
	}
	
	@GetMapping("/fff")
	public @ResponseBody String fff() {
		return "fff";
	}
}
