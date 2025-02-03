package com.dancing_orangutan.ukkikki.member.ui;

public record CompanyRegisterRequest(
        String email,
        String password,
        String ceoName,
        String companyName,
        String businessRegistrationNumber,
        String phoneNumber,
        String profileImageUrl
) {
}
