package com.dancing_orangutan.ukkikki.member.ui;

import lombok.Builder;
@Builder
public record AuthTokens(
        String accessToken,
        String refreshToken
) {}

