package com.dancing_orangutan.ukkikki.place.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class GeoCoordinateValidator implements ConstraintValidator<ValidGeoCoordinate, Double> {


    @Override
    public void initialize(ValidGeoCoordinate constraintAnnotation) {
    }

    @Override
    public boolean isValid(Double d, ConstraintValidatorContext context) {
        return false;
    }
}
