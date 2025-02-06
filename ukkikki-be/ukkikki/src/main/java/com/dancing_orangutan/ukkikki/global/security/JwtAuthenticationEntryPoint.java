package com.dancing_orangutan.ukkikki.global.security;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.util.JsonResponseUtils;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;

import java.io.IOException;

public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        if (request.getAttribute("expiredTokenException") != null) {
            JsonResponseUtils.sendJsonErrorResponse(response, ErrorCode.ACCESS_TOKEN_EXPIRED);
        }
        else if(request.getAttribute("invalidTokenException") != null){
            JsonResponseUtils.sendJsonErrorResponse(response, ErrorCode.INVALID_TOKEN);
        }else{
            JsonResponseUtils.sendJsonErrorResponse(response, ErrorCode.AUTHENTICATION_FAILED);
        }

        response.getWriter().flush();
    }
}
