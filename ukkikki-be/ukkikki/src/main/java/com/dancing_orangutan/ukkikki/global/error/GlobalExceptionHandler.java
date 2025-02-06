package com.dancing_orangutan.ukkikki.global.error;

import com.dancing_orangutan.ukkikki.global.util.ApiUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ApiUtils.ApiResponse> handleApiException(ApiException ex, WebRequest request) {

        return ResponseEntity
                .status(ex.getErrorCode().getStatus())
                .body(ApiUtils.error(ex.getErrorCode()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ApiUtils.ApiResponse> handleRuntimeException(RuntimeException ex, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        return ResponseEntity
                .status(status)
                .body(ApiUtils.error(status.name(), ex, status));
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiUtils.ApiResponse> unknownServerError(Exception ex, WebRequest request) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        return ResponseEntity
                .status(status)
                .body(ApiUtils.error(status.name(), ex, status));
    }
}
