package com.dancing_orangutan.ukkikki.global.error;


import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiException extends RuntimeException {
    private final ErrorCode errorCode;
}
