package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

import java.io.IOException;

public class JwtAccessDeniedHandler implements AccessDeniedHandler {

    @Override
    public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {
        ApiUtils.ApiResponse<?> errorResponse = ApiUtils.error("ACCESS_DENIED", "접근 권한이 없습니다.", HttpStatus.FORBIDDEN);
        JsonResponseUtils.sendJsonResponse(response, HttpStatus.FORBIDDEN, errorResponse);
    }
}
