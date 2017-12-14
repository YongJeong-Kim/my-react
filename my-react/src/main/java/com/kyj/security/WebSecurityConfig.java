package com.kyj.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordencoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests()
				.antMatchers("/", "/home/**").authenticated().anyRequest().permitAll()
				.antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
				.antMatchers("/user/**").hasAnyAuthority("ROLE_ADMIN", "ROLE_USER")
//				.antMatchers("/css/**", "/js/**").permitAll()
			.and()
				.formLogin().loginPage("/login").usernameParameter("username").passwordParameter("password").defaultSuccessUrl("/home")
			.and()
				.logout().logoutSuccessUrl("/login?logout")
			.and()
				.exceptionHandling().accessDeniedPage("/error/403")
			.and()
				.csrf().disable();
		
		
	}

	@Bean(name = "passwordEncoder")
	public PasswordEncoder passwordencoder() {
		return new BCryptPasswordEncoder();
	}
	
/*	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.
			authorizeRequests().antMatchers("/", "/home", "/auau", "/js/**", "/css/**").permitAll().anyRequest().authenticated().
			and().formLogin().loginPage("/login").permitAll().
			and().logout().permitAll();
	}*/
	
	@Override
    public void configure(WebSecurity web) throws Exception {
	/*	web.ignoring().antMatchers("/resources/**"); // #3
        web.ignoring().antMatchers("/static/**"); // #3
        web.ignoring().antMatchers("/ajax/**");
        web.ignoring().antMatchers("/common/**");
        web.ignoring().antMatchers("/js/**");
        web.ignoring().antMatchers("/css/**");*/
		web.ignoring().antMatchers("/css/**", "/js/**");
    }

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		System.out.println("configure global");
//		auth.inMemoryAuthentication().withUser("user").password("password").roles("USER");
	}
	
	/*@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userService).;
	}*/

}
