package com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken;

import com.dancing_orangutan.ukkikki.global.error.ApiException;
import com.dancing_orangutan.ukkikki.global.error.ErrorCode;
import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshTokenEntity;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@AllArgsConstructor
public class RefreshTokenFinder {
    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * 이메일로 refresh Token 조회
     */
    public RefreshTokenEntity findByEmail(String email) {
        return refreshTokenRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(ErrorCode.INVALID_TOKEN));
    }

}
