package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class CompanyNameValidator implements ConstraintValidator<ValidCompanyName, String> {

    private int max;

    @Override
    public void initialize(ValidCompanyName constraintAnnotation) {
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 회사 이름 없음
        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.COMPANY_NAME_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 회사 이름 길이 초과
        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.COMPANY_NAME_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
