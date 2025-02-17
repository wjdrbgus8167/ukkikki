package com.dancing_orangutan.ukkikki.global.oauth;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;

public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {

        if (exception.getCause() instanceof ApiException apiException) {
            ErrorCode errorCode = apiException.getErrorCode();
            JsonResponseUtils.sendJsonErrorResponse(request, response, errorCode);
        } else {
            JsonResponseUtils.sendJsonErrorResponse(request, response, ErrorCode.AUTHENTICATION_FAILED);
        }

        response.getWriter().flush();
    }
}
