package com.dancing_orangutan.ukkikki.global.config;

import com.dancing_orangutan.ukkikki.member.infrastructure.RefreshTokenRepository;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(
        basePackages = "com.dancing_orangutan.ukkikki",
        excludeFilters = @ComponentScan.Filter(
                type = FilterType.ASSIGNABLE_TYPE,
                classes = { RefreshTokenRepository.class }
        )
)
public class JpaConfig {
}
