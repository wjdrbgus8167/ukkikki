package com.dancing_orangutan.ukkikki.member.domain.refreshToken;

import lombok.Builder;
import lombok.Getter;

@Getter
public class RefreshToken {
    private String email;
    private String refreshToken;
    private long expiration;

    @Builder
    public RefreshToken(String email, String refreshToken, long expiration) {
        this.email = email;
        this.refreshToken = refreshToken;
        this.expiration = expiration;
    }

}
