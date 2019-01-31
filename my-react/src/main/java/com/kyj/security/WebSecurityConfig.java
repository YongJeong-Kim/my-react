package com.kyj.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.ServletListenerRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import com.kyj.config.ajax.AjaxAuthenticationFailureHandler;
import com.kyj.config.ajax.AjaxAuthenticationSuccessHandler;
import com.kyj.config.ajax.AjaxLogoutSuccessHandler;
import com.kyj.enums.Role;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
  private final UserDetailsService userDetailsService;
  private final AjaxAuthenticationSuccessHandler authSuccessHandler;
  private final AjaxAuthenticationFailureHandler authFailureHandler;
  private final AjaxLogoutSuccessHandler logoutSuccessHandler;

  @Autowired
	public WebSecurityConfig(UserDetailsService userDetailsService, AjaxAuthenticationSuccessHandler authSuccessHandler,
      AjaxAuthenticationFailureHandler authFailureHandler, AjaxLogoutSuccessHandler logoutSuccessHandler) {
    this.userDetailsService = userDetailsService;
    this.authSuccessHandler = authSuccessHandler;
    this.authFailureHandler = authFailureHandler;
    this.logoutSuccessHandler = logoutSuccessHandler;
  }

	@Autowired
	public void configAuthentication(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordencoder());
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		  .authorizeRequests()
				.antMatchers("/", "/home/**").authenticated().anyRequest().permitAll()
				.antMatchers("/admin/**").hasAuthority(Role.RoleName.ROLE_ADMIN)
				.antMatchers("/user/**").hasAnyAuthority(Role.RoleName.ROLE_ADMIN, Role.RoleName.ROLE_USER)
//				.antMatchers("/css/**", "/js/**").permitAll()
			.and()
			  .formLogin()
			  .loginPage("/login")
			  .usernameParameter("username")
			  .passwordParameter("password")
			  .defaultSuccessUrl("/home")
/*			  .successHandler(authSuccessHandler)
			  .failureHandler(authFailureHandler)*/
			.and()
			  .logout()
			  .logoutSuccessUrl("/login?logout")
			.and()
			  .exceptionHandling()
			  .accessDeniedPage("/error/403")
			.and()
			  .exceptionHandling()
			  .authenticationEntryPoint(new AjaxAwareAuthenticationEntryPoint("/login"))
//			.and()
//				.sessionManagement().maximumSessions(1).sessionRegistry(sessionRegistry());
			.and()
				.csrf().disable();

		http.sessionManagement().maximumSessions(1).expiredUrl("/login").sessionRegistry(sessionRegistry());
	}

	@Bean
  public SessionRegistry sessionRegistry() {
    return new SessionRegistryImpl();
  }

  @Bean
  public ServletListenerRegistrationBean<HttpSessionEventPublisher> httpSessionEventPublisher() {
    return new ServletListenerRegistrationBean<HttpSessionEventPublisher>(new HttpSessionEventPublisher());
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
