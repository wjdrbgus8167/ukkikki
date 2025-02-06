package com.dancing_orangutan.ukkikki.member.ui.request;

import lombok.Getter;

@Getter
public class CompanyRegisterRequest {
    private String email;
    private String password;
    private String ceoName;
    private String companyName;
    private String businessRegistrationNumber;
    private String phoneNumber;
    private String profileImageUrl;
}
