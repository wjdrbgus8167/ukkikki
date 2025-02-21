package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class ImageUrlValidator implements ConstraintValidator<ValidImageUrl, String> {
    private int max;

    @Override
    public void initialize(ValidImageUrl constraintAnnotation) {
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 길이 초과
        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.IMAGE_URL_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
