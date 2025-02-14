package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.CookieUtils;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken.RefreshTokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@AllArgsConstructor
@Component
public class CustomLogoutSuccessHandler implements LogoutSuccessHandler {

    private final RefreshTokenRepository refreshTokenRepository;
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException {

        CookieUtils.removeCookie(response,"access_token");
        CookieUtils.removeCookie(response, "refresh_token");

        if (authentication != null && authentication.getName() != null) {
            String email = authentication.getName();
            refreshTokenRepository.findByEmail(email).ifPresent(refreshTokenRepository::delete);
        }

        JsonResponseUtils.sendJsonResponse(request, response, HttpStatus.OK, ApiUtils.success("로그아웃을 완료했습니다"));
    }
}
