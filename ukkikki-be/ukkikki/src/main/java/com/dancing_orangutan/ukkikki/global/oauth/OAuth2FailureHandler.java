package com.dancing_orangutan.ukkikki.global.oauth;

import com.dancing_orangutan.ukkikki.global.config.AppConfig;
import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@RequiredArgsConstructor
public class OAuth2FailureHandler implements AuthenticationFailureHandler {
    private final AppConfig appConfig;

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = ErrorCode.AUTHENTICATION_FAILED.getMessage();
        String errorCode = ErrorCode.AUTHENTICATION_FAILED.getCode();

        if (exception.getCause() instanceof ApiException apiException) {
            ErrorCode error = apiException.getErrorCode();
            errorMessage = error.getMessage();
            errorCode = error.name();
        }

        String encodedMessage = URLEncoder.encode(errorMessage, StandardCharsets.UTF_8);
        String encodedErrorCode = URLEncoder.encode(errorCode, StandardCharsets.UTF_8);

        String redirectUrl = "https://" + appConfig.getDomain() + "/oauth/failure?error=" + encodedErrorCode + "&message=" + encodedMessage;
        response.sendRedirect(redirectUrl);
    }
}
