package com.dancing_orangutan.ukkikki.member.domain.company;

import lombok.Builder;
import lombok.Getter;

@Getter
public class Company {
    private String email;
    private String password;
    private String ceoName;
    private String companyName;
    private String businessRegistrationNumber;
    private String phoneNumber;
    private String profileImageUrl;

    @Builder
    public Company(String email, String password, String ceoName, String companyName, String businessRegistrationNumber, String phoneNumber, String profileImageUrl) {
        this.email = email;
        this.password = password;
        this.ceoName = ceoName;
        this.companyName = companyName;
        this.businessRegistrationNumber = businessRegistrationNumber;
        this.phoneNumber = phoneNumber;
        this.profileImageUrl = profileImageUrl;
    }
}
