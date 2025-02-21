package com.dancing_orangutan.ukkikki.member.ui.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class GetCompanyProfileImageResponse {
    private final String profileImageUrl;
}
