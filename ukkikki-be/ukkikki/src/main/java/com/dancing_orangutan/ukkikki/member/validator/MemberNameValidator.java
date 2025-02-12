package com.dancing_orangutan.ukkikki.member.validator;


import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.global.validator.BaseNameValidator;

public class MemberNameValidator extends BaseNameValidator<ValidMemberName> {

    @Override
    protected void setUp(ValidMemberName constraintAnnotation) {
        this.max = constraintAnnotation.max();
        this.requiredErrorCode = ErrorCode.MEMBER_NAME_REQUIRED;
        this.tooLongErrorCode = ErrorCode.MEMBER_NAME_TOO_LONG;
    }
}
