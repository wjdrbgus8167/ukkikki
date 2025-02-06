package com.dancing_orangutan.ukkikki.global.util;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;

import java.io.IOException;

public class JsonResponseUtils {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    public static void sendJsonResponse(HttpServletResponse response, HttpStatus status, Object responseData) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write(objectMapper.writeValueAsString(responseData));
        response.getWriter().flush();
    }

    public static void sendJsonErrorResponse(HttpServletResponse response, ErrorCode errorCode) throws IOException {
        sendJsonResponse(response, errorCode.getStatus(), ApiUtils.error(errorCode));
    }
}
