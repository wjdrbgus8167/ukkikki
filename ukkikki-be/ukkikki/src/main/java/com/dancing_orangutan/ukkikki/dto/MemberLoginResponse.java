package com.dancing_orangutan.ukkikki.dto;

import lombok.Builder;

@Builder
public record MemberLoginResponse(
        String accessToken
) {
}
