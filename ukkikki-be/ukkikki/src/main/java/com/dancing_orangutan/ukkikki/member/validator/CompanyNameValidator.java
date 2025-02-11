package com.dancing_orangutan.ukkikki.member.validator;

import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.validator.BaseNameValidator;

public class CompanyNameValidator extends BaseNameValidator<ValidCompanyName> {

    @Override
    protected void setUp(ValidCompanyName constraintAnnotation) {
        this.max = constraintAnnotation.max();
        this.requiredErrorCode = ErrorCode.COMPANY_NAME_REQUIRED;
        this.tooLongErrorCode = ErrorCode.COMPANY_NAME_TOO_LONG;
    }
}
