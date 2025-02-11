package com.dancing_orangutan.ukkikki.member.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = BusinessRegistrationNumberValidator.class)
public @interface ValidBusinessRegistrationNumber {
    String message() default "사업자 번호가 유효하지 않습니다.";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    String pattern() default "^[0-9]+$";
    int max() default 12;
}
