package com.dancing_orangutan.ukkikki;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
public class UkkikkiApplication {

	public static void main(String[] args) {
		SpringApplication.run(UkkikkiApplication.class, args);
	}

}
