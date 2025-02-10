package com.dancing_orangutan.ukkikki.member.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCompanyProfileResponse {
    private final String email;
    private final String ceoName;
    private final String companyName;
    private final String businessRegistrationNumber;
    private final String phoneNumber;
    private final String profileImageUrl;
}
