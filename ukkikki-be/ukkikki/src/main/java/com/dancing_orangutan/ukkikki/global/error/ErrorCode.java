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

    //TRAVEL_PLAN
    TRAVEL_PLAN_NOT_FOUND(HttpStatus.NOT_FOUND,"TP001", "해당 여행 계획을 찾을 수 없습니다."),
    MINIMUM_PARTICIPANTS_NOT_FULFILLED(HttpStatus.BAD_REQUEST, "TP002", "최소 인원을 충족하지 못하여 제출할 수 없습니다."),

    // S3
    S3_UPLOAD_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "S001", "S3 파일 업로드 중 오류가 발생했습니다."),

    // Validation
    INVALID_INPUT_PARAMETER(HttpStatus.BAD_REQUEST, "V001", "입력값이 유효하지 않습니다."),

    PASSWORD_REQUIRED(HttpStatus.BAD_REQUEST, "V002", "비밀번호는 필수입니다."),
    PASSWORD_TOO_SHORT(HttpStatus.BAD_REQUEST, "V003", "비밀번호는 최소 8자 이상이어야 합니다."),
    PASSWORD_TOO_LONG(HttpStatus.BAD_REQUEST, "V004", "비밀번호는 72자 이하여야 합니다."),
    EMAIL_REQUIRED(HttpStatus.BAD_REQUEST, "V005", "이메일은 필수입니다."),
    INVALID_EMAIL_FORMAT(HttpStatus.BAD_REQUEST, "V006", "유효하지 않은 이메일 형식입니다."),
    EMAIL_TOO_LONG(HttpStatus.BAD_REQUEST, "V007", "이메일은 30자 이하여야 합니다."),
    MEMBER_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "V008", "회원 이름은 필수입니다."),
    MEMBER_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "V009", "회원 이름은 20자 이하여야 합니다."),
    COMPANY_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "V010", "회사 이름은 필수입니다."),
    COMPANY_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "V011", "회사 이름은 30자 이하여야 합니다."),
    IMAGE_URL_TOO_LONG(HttpStatus.BAD_REQUEST, "V012", "이미지 url은 2000자 이하여야 합니다."),
    PHONE_NUMBER_REQUIRED(HttpStatus.BAD_REQUEST, "V013", "전화번호는 필수입니다."),
    PHONE_NUMBER_INVALID_CHARACTERS(HttpStatus.BAD_REQUEST, "V014", "전화번호는 숫자만 포함해야 합니다."),
    PHONE_NUMBER_TOO_LONG(HttpStatus.BAD_REQUEST, "V015", "전화번호는 11자리 이하여야 합니다."),
    BUSINESS_REGISTRATION_NUMBER_REQUIRED(HttpStatus.BAD_REQUEST, "V016", "사업자 번호는 필수입니다."),
    BUSINESS_REGISTRATION_NUMBER_INVALID_CHARACTERS(HttpStatus.BAD_REQUEST, "V017", "사업자 번호는 숫자만 포함해야 합니다."),
    BUSINESS_REGISTRATION_NUMBER_TOO_LONG(HttpStatus.BAD_REQUEST, "V018", "사업자 번호는 12자리 이하여야 합니다."),

    PLACE_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "V019", "장소 이름은 필수입니다."),
    PLACE_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "V020", "장소 이름은 50자 이하여야 합니다."),
    PLACE_TAG_NAME_REQUIRED(HttpStatus.BAD_REQUEST, "V021", "장소 태그 이름은 필수입니다."),
    PLACE_TAG_NAME_TOO_LONG(HttpStatus.BAD_REQUEST, "V022", "장소 태그 이름은 50자 이하여야 합니다."),
    PLACE_ADDRESS_REQUIRED(HttpStatus.BAD_REQUEST, "V023", "장소 주소는 필수입니다."),
    PLACE_ADDRESS_TOO_LONG(HttpStatus.BAD_REQUEST, "V023", "장소 주소는 100자 이하여야 합니다."),
    LATITUDE_REQUIRED(HttpStatus.BAD_REQUEST, "V024", "위도는 필수입니다."),
    LATITUDE_OUT_OF_RANGE(HttpStatus.BAD_REQUEST, "V025", "위도 값은 -90과 90 사이여야 합니다."),
    LONGITUDE_REQUIRED(HttpStatus.BAD_REQUEST, "V026", "경도는 필수입니다."),
    LONGITUDE_OUT_OF_RANGE(HttpStatus.BAD_REQUEST, "V027", "경도 값은 -180과 180 사이여야 합니다.");




    private final HttpStatus status;
    private final String code;
    private final String message;

}
