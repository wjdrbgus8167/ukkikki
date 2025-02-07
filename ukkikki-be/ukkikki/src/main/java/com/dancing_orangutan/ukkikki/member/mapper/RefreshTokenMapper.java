package com.dancing_orangutan.ukkikki.member.mapper;

import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshToken;
import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshTokenEntity;


public class RefreshTokenMapper {

    public static RefreshTokenEntity mapToEntity(RefreshToken refreshToken) {
        return RefreshTokenEntity.builder()
                .email(refreshToken.getEmail())
                .userId(refreshToken.getUserId())
                .refreshToken(refreshToken.getRefreshToken())
                .expiration(refreshToken.getExpiration())
                .build();
    }
}
