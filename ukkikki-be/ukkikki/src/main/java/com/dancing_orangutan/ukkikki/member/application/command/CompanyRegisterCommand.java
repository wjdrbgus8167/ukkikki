package com.dancing_orangutan.ukkikki.member.application.command;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CompanyRegisterCommand {
    private final String email;
    private final String password;
    private final String ceoName;
    private final String companyName;
    private final String businessRegistrationNumber;
    private final String phoneNumber;
    private final String profileImageUrl;
}
