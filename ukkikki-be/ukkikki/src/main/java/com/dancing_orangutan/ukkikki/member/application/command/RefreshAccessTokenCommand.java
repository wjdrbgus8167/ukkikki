package com.dancing_orangutan.ukkikki.member.application.command;

import lombok.Builder;
import lombok.Getter;

import java.util.Optional;

@Getter
@Builder
public class RefreshAccessTokenCommand {
    private final Optional<String> refreshToken;
}
