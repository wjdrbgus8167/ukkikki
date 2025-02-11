package com.dancing_orangutan.ukkikki.place.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.validator.BaseNameValidator;

public class PlaceNameValidator extends BaseNameValidator<ValidPlaceName> {

    @Override
    protected void setUp(ValidPlaceName constraintAnnotation) {
        this.max = constraintAnnotation.max();
        this.requiredErrorCode = ErrorCode.PLACE_NAME_REQUIRED;
        this.tooLongErrorCode = ErrorCode.PLACE_NAME_TOO_LONG;
    }
}
