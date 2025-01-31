package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        if (request.getAttribute("expiredTokenException") != null) {
            ApiUtils.ApiResponse<?> errorResponse = ApiUtils.error("TOKEN_EXPIRED", "토큰이 만료되었습니다.", HttpStatus.UNAUTHORIZED);
            JsonResponseUtils.sendJsonResponse(response, HttpStatus.UNAUTHORIZED, errorResponse);
        }
        else if(request.getAttribute("invalidTokenException") != null){
            ApiUtils.ApiResponse<?> errorResponse = ApiUtils.error("INVALID_TOKEN", "토큰이 유효하지 않습니다.", HttpStatus.BAD_REQUEST);
            JsonResponseUtils.sendJsonResponse(response, HttpStatus.BAD_REQUEST, errorResponse);
        }

        response.getWriter().flush();
    }
}
