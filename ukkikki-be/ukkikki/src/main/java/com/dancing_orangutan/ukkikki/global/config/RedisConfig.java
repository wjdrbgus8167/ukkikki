package com.dancing_orangutan.ukkikki.global.config;

import com.dancing_orangutan.ukkikki.member.infrastructure.RefreshTokenRepository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

@Configuration
@EnableRedisRepositories(
    basePackages = "com.dancing_orangutan.ukkikki.member.infrastructure",
    includeFilters = @ComponentScan.Filter(
            type = FilterType.ASSIGNABLE_TYPE,
            classes = { RefreshTokenRepository.class }
    )
)
public class RedisConfig {
}
