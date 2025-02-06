package com.dancing_orangutan.ukkikki.member.infrastructure.refreshToken;

import com.dancing_orangutan.ukkikki.member.domain.refreshToken.RefreshTokenEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends CrudRepository<RefreshTokenEntity, Long> {

    Optional<RefreshTokenEntity> findByRefreshToken(String refreshToken);
}
