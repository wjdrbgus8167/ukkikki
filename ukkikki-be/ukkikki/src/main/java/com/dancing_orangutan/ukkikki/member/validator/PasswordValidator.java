package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {
    private static final int MIN_LENGTH = 8;
    private static final int MAX_LENGTH = 72; // Bcrypt의 최대 길이

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation(); // 기본 메시지 비활성화

        // 비밀번호 없음 : null or 빈문자열
        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PASSWORD_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 비밀번호 7자 이하
        if (s.length() < MIN_LENGTH) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PASSWORD_TOO_SHORT.name())
                    .addConstraintViolation();
            return false;
        }

        // 비밀번호 72 초과
        if (s.length() > MAX_LENGTH) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PASSWORD_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
