package com.dancing_orangutan.ukkikki.place.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PlaceAddressValidator implements ConstraintValidator<ValidPlaceAddress, String> {

    private int max;

    @Override
    public void initialize(ValidPlaceAddress constraintAnnotation) {
        this.max = constraintAnnotation.max();
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext context) {
        context.disableDefaultConstraintViolation();

        if (s == null || s.trim().isEmpty()) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PLACE_ADDRESS_REQUIRED.name())
                    .addConstraintViolation();
            return false;
        }

        if (s.length() > max) {
            context.buildConstraintViolationWithTemplate(ErrorCode.PLACE_ADDRESS_TOO_LONG.name())
                    .addConstraintViolation();
            return false;
        }

        return true;
    }
}
