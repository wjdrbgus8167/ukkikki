package com.dancing_orangutan.ukkikki.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {

    // MEMBER
    MEMBER_NOT_FOUND(HttpStatus.NOT_FOUND,"M001", "해당 이메일로 등록된 사용자를 찾을 수 없습니다."),
    EMAIL_ALREADY_IN_USE(HttpStatus.CONFLICT, "M002", "이미 사용 중인 이메일입니다."),
    COMPANY_NOT_FOUND(HttpStatus.NOT_FOUND, "M003", "해당 이메일로 등록된 회사를 찾을 수 없습니다."),

    // 인증 관련
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "A001", "접근 권한이 없습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "A002", "토큰이 만료되었습니다."),
    INVALID_TOKEN(HttpStatus.BAD_REQUEST, "A003", "토큰이 유효하지 않습니다."),
    AUTHENTICATION_FAILED(HttpStatus.UNAUTHORIZED, "A004", "인증에 실패하였습니다."),
    INVALID_PASSWORD(HttpStatus.UNAUTHORIZED, "A005", "비밀번호가 일치하지 않습니다."),
    MISSING_REFRESH_TOKEN(HttpStatus.BAD_REQUEST, "A006", "Refresh Token이 존재하지 않습니다."),
    INVALID_TOKEN_SIGNATURE(HttpStatus.UNAUTHORIZED, "A007", "잘못된 JWT 서명입니다."),
    UNSUPPORTED_TOKEN(HttpStatus.BAD_REQUEST, "A008", "지원되지 않는 JWT 토큰입니다."),
    INVALID_TOKEN_FORMAT(HttpStatus.BAD_REQUEST, "A009", "JWT 토큰 형식이 잘못되었습니다."),

    // GEOGRAPHY
    GEOGRAPHY_CONTINENT_VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "G001", "대륙 조회 필수 파라미터가 유효하지 않습니다."),
    GEOGRAPHY_COUNTRY_VALIDATION_FAILED(HttpStatus.BAD_REQUEST, "G001", "도시 조회 필수 파라미터가 유효하지 않습니다."),

    // S3
    S3_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S001", "S3 파일 업로드 중 오류가 발생했습니다.");


    private final HttpStatus status;
    private final String code;
    private final String message;

}
