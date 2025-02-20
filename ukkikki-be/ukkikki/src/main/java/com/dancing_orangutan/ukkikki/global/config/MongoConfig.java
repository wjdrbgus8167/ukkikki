package com.dancing_orangutan.ukkikki.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoAuditing
@EnableMongoRepositories(
		basePackages = "com.dancing_orangutan.ukkikki.chat.infrastructure"
)
public class MongoConfig {
}

