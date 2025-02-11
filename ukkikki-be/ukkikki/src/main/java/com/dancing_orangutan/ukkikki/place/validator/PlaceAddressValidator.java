package com.dancing_orangutan.ukkikki.place.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PlaceAddressValidator implements ConstraintValidator<ValidPlaceAddress, String> {
    @Override
    public void initialize(ValidPlaceAddress constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(String s, ConstraintValidatorContext constraintValidatorContext) {
        return false;
    }
}
