package com.dancing_orangutan.ukkikki.dto;

import lombok.Builder;
@Builder
public record AuthTokens(
        String accessToken,
        String refreshToken
) {}

