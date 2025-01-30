package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.response.ApiUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.setContentType("application/json; charset=UTF-8");
        if (request.getAttribute("expiredTokenException") != null) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            ApiUtils.ApiResponse<?> errorResponse = ApiUtils.error("TOKEN_EXPIRED", "토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        } else {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            ApiUtils.ApiResponse<?> errorResponse = ApiUtils.error("INVALID_TOKEN", "토큰이 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
            response.getWriter().write(new ObjectMapper().writeValueAsString(errorResponse));
        }

        response.getWriter().flush();
    }
}
