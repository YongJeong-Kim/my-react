package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication//(exclude=SecurityAutoConfiguration.class)
public class MyReactApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyReactApplication.class, args);
	}
}
