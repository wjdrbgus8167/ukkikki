package com.dancing_orangutan.ukkikki.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // MEMBER
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND,"M001", "사용자를 찾을 수 없습니다."),


    // 인증 관련
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "A001", "접근 권한이 없습니다."),
    ACCESS_TOKEN_EXPIRED(HttpStatus.UNAUTHORIZED, "A002", "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "A003", "토큰이 유효하지 않습니다."),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "A004", "인증에 실패하였습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;

}
