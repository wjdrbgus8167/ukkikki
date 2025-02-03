package com.dancing_orangutan.ukkikki.global.oauth;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "spring.security.oauth2.client")
public class KakaoProperties {

    private Registration registration = new Registration();
    private Provider provider = new Provider();

    @Getter
    @Setter
    public static class Registration {
        private Kakao kakao = new Kakao();

        @Getter
        @Setter
        public static class Kakao {
            private String clientId;
            private String redirectUri;
            private String authorizationGrantType;
        }
    }

    @Getter
    @Setter
    public static class Provider {
        private Kakao kakao = new Kakao();

        @Getter
        @Setter
        public static class Kakao {
            private String authorizationUri;
            private String tokenUri;
            private String userInfoUri;
        }
    }
}
