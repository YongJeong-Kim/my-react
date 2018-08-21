package com.kyj.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class SwaggerConfig {
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
			.select()
			/* 모든 패키지
			.apis(RequestHandlerSelectors.any())*/
			.apis(RequestHandlerSelectors.basePackage("com.kyj.rest"))
			.paths(PathSelectors.ant("/user/**"))
			/* 모든 패키지
			.paths(PathSelectors.any())*/
			.build();
	}
}
