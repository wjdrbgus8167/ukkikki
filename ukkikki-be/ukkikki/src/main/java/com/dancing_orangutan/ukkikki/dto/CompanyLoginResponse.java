package com.dancing_orangutan.ukkikki.dto;

import lombok.Builder;

@Builder
public record CompanyLoginResponse(
        String accessToken
) {
}
