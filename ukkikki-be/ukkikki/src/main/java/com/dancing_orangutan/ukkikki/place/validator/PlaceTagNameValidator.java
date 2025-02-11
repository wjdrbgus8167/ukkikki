package com.dancing_orangutan.ukkikki.place.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.validator.BaseNameValidator;

public class PlaceTagNameValidator extends BaseNameValidator<ValidPlaceTagName> {

    @Override
    protected void setUp(ValidPlaceTagName constraintAnnotation) {
        this.max = constraintAnnotation.max();
        this.requiredErrorCode = ErrorCode.PLACE_TAG_NAME_REQUIRED;
        this.tooLongErrorCode = ErrorCode.PLACE_TAG_NAME_TOO_LONG;
    }
}
