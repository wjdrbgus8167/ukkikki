package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class BusinessRegistrationNumberValidator implements ConstraintValidator<ValidBusinessRegistrationNumber, String> {

    private Pattern businessRegistrationNumberPattern;
    private int max;

    @Override
    public void initialize(ValidBusinessRegistrationNumber constraintAnnotation) {
        this.businessRegistrationNumberPattern = Pattern.compile(constraintAnnotation.pattern());
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 사업자 번호 없음
        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.BUSINESS_REGISTRATION_NUMBER_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 숫자 외의 문자 존재
        if (!businessRegistrationNumberPattern.matcher(s).matches()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.BUSINESS_REGISTRATION_NUMBER_INVALID_CHARACTERS.name())
                    .addConstraintViolation();
            return false;
        }

        // 길이 초과
        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.BUSINESS_REGISTRATION_NUMBER_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
