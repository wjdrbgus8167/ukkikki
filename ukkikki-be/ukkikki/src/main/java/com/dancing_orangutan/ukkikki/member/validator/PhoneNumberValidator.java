package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {

    private Pattern phoneNumberPattern;
    private int max;

    @Override
    public void initialize(ValidPhoneNumber constraintAnnotation) {
        this.phoneNumberPattern = Pattern.compile(constraintAnnotation.pattern());
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 전화번호 없음
        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PHONE_NUMBER_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 숫자 외의 문자 존재
        if (!phoneNumberPattern.matcher(s).matches()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PHONE_NUMBER_INVALID_CHARACTERS.name())
                    .addConstraintViolation();
            return false;
        }

        // 길이 초과
        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PHONE_NUMBER_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
