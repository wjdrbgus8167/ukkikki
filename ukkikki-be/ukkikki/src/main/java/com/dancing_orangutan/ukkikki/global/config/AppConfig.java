package com.dancing_orangutan.ukkikki.global.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Value("${app.domain}")
    private String domain;

    public String getDomain() {
        return domain;
    }
}
