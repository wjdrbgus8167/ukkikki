package com.dancing_orangutan.ukkikki.global.oauth;

import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Map;

public class KakaoUserMapper implements ProviderUserMapper{
    @Override
    public Map<String, Object> mapAttributes(OAuth2User oauth2User) {
        Map<String, Object> kakaoAccount = oauth2User.getAttribute("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        return Map.of(
                "email", kakaoAccount.get("email"),
                "name", profile.get("nickname"),
                "profileImageUrl", profile.get("profile_image_url")
        );
    }
}
