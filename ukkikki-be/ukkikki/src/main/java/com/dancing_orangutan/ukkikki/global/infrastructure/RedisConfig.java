package com.dancing_orangutan.ukkikki.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@EnableRedisRepositories(
    basePackages = "com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken"
)
public class RedisConfig {
}
