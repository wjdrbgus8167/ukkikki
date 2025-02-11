package com.dancing_orangutan.ukkikki.place.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PlaceNameValidator implements ConstraintValidator<ValidPlaceName, String> {

    private int max;

    @Override
    public void initialize(ValidPlaceName constraintAnnotation) {
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 이름 없음
        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.NAME_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 이름 길이 초과
        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.NAME_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
