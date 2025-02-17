package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.config.AppConfig;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    private final AppConfig appConfig;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        if (request.getAttribute("expiredTokenException") != null) {
            JsonResponseUtils.sendJsonErrorResponse(request, response, ErrorCode.EXPIRED_TOKEN);
        } else if (request.getAttribute("invalidTokenException") != null) {
            JsonResponseUtils.sendJsonErrorResponse(request, response, ErrorCode.INVALID_TOKEN);
        } else if (authException instanceof OAuth2AuthenticationException authEx) {
            String errorCode = ErrorCode.AUTHENTICATION_FAILED.getCode();
            String errorMessage = ErrorCode.AUTHENTICATION_FAILED.getMessage();

            try {
                errorCode = authEx.getMessage();
                errorMessage = ErrorCode.valueOf(errorCode).getMessage();
            } catch (IllegalArgumentException e) {}

            String encodedMessage = URLEncoder.encode(errorMessage, StandardCharsets.UTF_8);
            String encodedErrorCode = URLEncoder.encode(errorCode, StandardCharsets.UTF_8);

            String redirectUrl = "https://" + appConfig.getDomain() + "/oauth/failure?error=" + encodedErrorCode + "&message=" + encodedMessage;
            response.sendRedirect(redirectUrl);
            return;
        } else {
            JsonResponseUtils.sendJsonErrorResponse(request, response, ErrorCode.AUTHENTICATION_FAILED);
        }

        response.getWriter().flush();
    }
}
