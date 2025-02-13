package com.dancing_orangutan.ukkikki.place.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class LatitudeValidator implements ConstraintValidator<ValidLatitude, Double> {

    private int min;
    private int max;

    @Override
    public void initialize(ValidLatitude constraintAnnotation) {
        this.min = constraintAnnotation.min();
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(Double d, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        // 위도 값이 없는 경우
        if (d == null) {
            context.buildConstraintViolationWithTemplate(ErrorCode.LATITUDE_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        // 위도 값이 지정된 범위를 벗어난 경우
        if (d < min || d > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.LATITUDE_OUT_OF_RANGE.name())
                    .addConstraintViolation();
            return false;
        }
        return true;
    }
}
