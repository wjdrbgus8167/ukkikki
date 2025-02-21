package com.dancing_orangutan.ukkikki.member.ui.request;

import com.dancing_orangutan.ukkikki.member.validator.*;
import lombok.Getter;

@Getter
public class CompanyRegisterRequest {
    @ValidEmail
    private String email;
    @ValidPassword
    private String password;
    @ValidMemberName
    private String ceoName;
    @ValidCompanyName
    private String companyName;
    @ValidBusinessRegistrationNumber
    private String businessRegistrationNumber; // 숫자 10자리
    @ValidPhoneNumber
    private String phoneNumber;
    @ValidImageUrl
    private String profileImageUrl;
}
